import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import matter from "gray-matter";
import "dotenv/config";
import moment from "moment-timezone";
import crypto from "crypto";
const OWNER = "javimogan";
const REPO = "contenidos";

const CONTENT_PATH = "docs";
const PUBLIC_IMAGE_DIR = "/images/" + CONTENT_PATH;
const PUBLIC_DEFAULT_IMAGE_DIR = "/images/default";

const OS_PUBLIC_IMAGE_DIR = path.resolve(`public/${PUBLIC_IMAGE_DIR}`);
const OS_PUBLIC_DEFAULT_IMAGE_DIR = path.resolve(
    `public/${PUBLIC_DEFAULT_IMAGE_DIR}`,
);
const OUTPUT_DIR = path.resolve("src/content/" + CONTENT_PATH);

const GITHUB_API_URL =
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/`;
const HEADERS = {
    "Authorization": `Bearer ${process.env.TOKEN_GITHUB}`,
    "Accept": "application/vnd.github.v3+json",
};

[OUTPUT_DIR, OS_PUBLIC_IMAGE_DIR, OS_PUBLIC_DEFAULT_IMAGE_DIR].forEach(
    (dir) => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    },
);

const githubFiles: Set<string> = new Set();
const downloadedImages: Set<string> = new Set();

function generarHash(nombreArchivo) {
    return crypto.createHash("md5") // O usa 'sha1' o 'sha256'
        .update(nombreArchivo)
        .digest("hex")
        .slice(0, 10); // Limitar la longitud del hash
}
// Obtener metadatos del archivo desde la API de GitHub
const getGitHubMetadata = async (filePath: string) => {
    const apiUrl =
        `https://api.github.com/repos/${OWNER}/${REPO}/commits?path=${filePath}&per_page=1`;

    try {
        const response = await fetch(apiUrl, { headers: HEADERS });
        if (!response.ok) return { creationDate: null, updatedDate: null };

        const commits = await response.json();
        if (!Array.isArray(commits) || commits.length === 0) {
            return { creationDate: null, updatedDate: null };
        }

        return {
            creationDate: commits[0].commit.author.date,
            updatedDate: commits[0].commit.committer.date,
        };
    } catch (error) {
        console.error(`❌ Error obteniendo metadatos de ${filePath}:`, error);
        return { creationDate: null, updatedDate: null };
    }
};

// Descargar imágenes de `heroImage`
// const downloadImage = async (imageUrl: string, imageName: string) => {
//     try {
//         const imagePath = path.join(OS_PUBLIC_IMAGE_DIR, imageName);
//         downloadedImages.add(imagePath);
//         if (fs.existsSync(imagePath)) return;

//         const response = await fetch(imageUrl);
//         if (!response.ok) {
//             throw new Error(`Error descargando imagen: ${response.statusText}`);
//         }
//         if (!fs.existsSync(imagePath.split("/").slice(0, -1).join("/"))) {
//             fs.mkdirSync(imagePath.split("/").slice(0, -1).join("/"), {
//                 recursive: true,
//             });
//         }

//         const buffer = await response.arrayBuffer();
//         fs.writeFileSync(imagePath, Buffer.from(buffer));
//         console.log(`✅ Imagen descargada: ${imageName}`);
//     } catch (error) {
//         console.error(`❌ Error al descargar la imagen ${imageUrl}:`, error);
//     }
// };

// Descargar archivos recursivamente
const downloadFiles = async (url: string, localPath: string): Promise<void> => {
    try {
        console.log(`📂 Revisando: ${url}`);
        const response = await fetch(url, { headers: HEADERS });
        if (!response.ok) {
            throw new Error(
                `Error al obtener la lista de archivos. ${response.statusText}`,
            );
        }

        const files = await response.json();
        if (!Array.isArray(files)) {
            throw new Error("La respuesta no es una lista de archivos.");
        }

        let hasIndex = false;
        const childrenFiles: string[] = [];
        // let folderPubDate: string | null = null;
        // let folderUpdatedDate: string | null = null;
        // let folderHeroImage: string | null = null;

        //TODO: Images
        // const images = files.filter((file) =>
        //     file.type === "file" && /\.(png|jpe?g|webp|gif)$/i.test(file.name)
        // );

        //Save images in the folder
        // for (const image of images) {
        //     downloadedImages.add(path.join(OS_PUBLIC_IMAGE_DIR, image.path));
        //     await downloadImage(image.download_url, image.path);
        // }

        for (const file of files) {
            const filePath = path.join(localPath, file.name);
            if (
                file.type === "file" &&
                (file.name.endsWith(".md") || file.name.endsWith(".mdx"))
            ) {
                const fileResponse = await fetch(file.download_url);
                let content = await fileResponse.text();

                const metadata = await getGitHubMetadata(file.path);
                const { data, content: markdownContent } = matter(content);

                // Ignorar archivos en borrador
                if (data.draft === true) continue;

                githubFiles.add(filePath);
                childrenFiles.push(filePath);

                // Set hashId
                if (!data.id) {
                    data.id = generarHash(file.path);
                }
                // Set lastUpdated
                data.lastUpdated = moment(metadata.updatedDate).toDate();
                //Set default title
                if (!data.title) {
                    data.title = path.basename(
                        file.name,
                        path.extname(file.name),
                    );
                }

                // // data.heroImage = data.heroImage?path.join(PUBLIC_IMAGE_DIR, file.path.split("/").slice(0, -1).join("/"), data.heroImage): getRandomDefaultImage();
                // if (!folderHeroImage && data.heroImage) {
                //     folderHeroImage = data.heroImage;
                // }

                if (file.name === "index.md" || file.name === "index.mdx") {
                    hasIndex = true;
                    data.pagefind = false;
                }

                const newContent = matter.stringify(markdownContent, data);
                if (
                    !fs.existsSync(filePath) ||
                    fs.readFileSync(filePath, "utf8") !== newContent
                ) {
                    fs.writeFileSync(filePath, newContent, "utf8");
                    console.log(`✅ Descargado con metadata: ${filePath}`);
                }
            } else if (file.type === "dir") {
                //Si es una carpeta ocula, ignorar
                if (file.name.startsWith(".")) continue;
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, { recursive: true });
                }
                await downloadFiles(file.url, filePath);
            }
        }

        // Si la carpeta no tiene `index.md`, crear uno automáticamente
        if (
            !hasIndex &&
            localPath.split("/").slice(-1)[0] !== CONTENT_PATH
        ) {
            console.log(`📄 Creando index.md para la carpeta: ${localPath}`);

            const folderData = {
                title: path.basename(localPath),
                // pubDate: folderPubDate ?? moment().format("DD/MM/YYYY HH:mm"),
                // updatedDate: folderUpdatedDate ??
                //     moment().format("DD/MM/YYYY HH:mm"),
                // heroImage: folderHeroImage ?? getRandomDefaultImage(),
                autogenerated: true,
                pagefind: false,
                id: generarHash(localPath),
            };

            const folderContent = matter.stringify("", folderData);
            fs.writeFileSync(
                path.join(localPath, "index.md"),
                folderContent,
                "utf8",
            );
        }
    } catch (error) {
        console.error(`❌ Error descargando archivos desde ${url}:`, error);
    }
};

// Limpiar imágenes no utilizadas en /public/images/blog/
const cleanDir = (dir: string) => {
    if (!fs.existsSync(dir)) return;
    fs.rmSync(dir, { recursive: true });
};

// Ejecutar la función principal
(async () => {
    console.log("🚀 Sincronizando artículos desde GitHub...");
    cleanDir(OS_PUBLIC_IMAGE_DIR);
    cleanDir(OUTPUT_DIR);
    await downloadFiles(GITHUB_API_URL, OUTPUT_DIR);
    console.log("🧹 Limpiando imágenes no utilizadas...");
    console.log("🎉 Sincronización completada.");
})();
