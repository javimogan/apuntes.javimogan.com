import starlightPlugin from "@astrojs/starlight-tailwind";

// Generated color palettes
const accent = {
	200: "#bb8bf5", // Dark
	600: "#d4294b", // Light
	900: "green",
	950: "#101218",
};
const gray = {
	100: "#fafafa",
	200: "#EBEEF2",//"#e5e9f0",
	300: "#DADADA",//"#e8e8e8",
	400: "#BABABA",//"#60739f",
	500: "#616161",//"#92374D",
	700: "#616161", // Text
	800: "#303030",//"#101218",
	900: "#101218",
};

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: { accent, gray },
		},
	},
	plugins: [starlightPlugin()],
};
