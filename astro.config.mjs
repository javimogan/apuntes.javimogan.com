// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    site: 'https://apuntes.javimogan.com',
    integrations: [
        starlight({
            title: "Apuntes",
            description: "Apuntes varios",
            logo: {
                light: "/public/favicon.svg",
                dark: "/public/favicon-dark.svg",
                alt: "Logotipo de la página",
            },
            expressiveCode: {
                themes: ['github-dark', 'github-light'],
                defaultLocale: 'es-ES'
            },
            locales: {
                root:{
                    label: "Español",
                    dir:'ltr',
                    lang: 'es',
                }
            },
            // routeMiddleware: ["./src/routeData.ts"],
            // social: {
            //     github: "https://github.com/javimogan/apuntes.javimogan.com",
            // },
            defaultLocale: "es",
            components: {
                Sidebar: "./src/components/Sidebar.astro",
                Footer: "./src/components/Footer.astro",
                MarkdownContent: "./src/components/MarkdownContent.astro",
                LastUpdated: "./src/components/LastUpdated.astro",
            },
            customCss: ["./src/tailwind.css"],
        }),
        tailwind({ applyBaseStyles: false }),
    ],
});
