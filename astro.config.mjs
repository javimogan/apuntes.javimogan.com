// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: "Apuntes",
            description: "Apuntes varios",
            logo: {
                //Local path
                src: 'https://apuntes.javimogan.com/favicon.svg',
                alt: "Apuntes",
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
            },
            customCss: ["./src/tailwind.css"],
        }),
        tailwind({ applyBaseStyles: false }),
    ],
});
