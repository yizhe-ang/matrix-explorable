import adapterStatic from "@sveltejs/adapter-static";
import sveltePreprocess from "svelte-preprocess";
import autoprefixer from "autoprefixer";
import { preprocessMeltUI } from "@melt-ui/pp";
import sequence from "svelte-sequential-preprocessor";
import { vitePreprocess } from '@sveltejs/kit/vite';

const preprocess = sveltePreprocess({
	postcss: {
		plugins: [autoprefixer]
	}
});

const config = {
	preprocess: sequence([preprocess, vitePreprocess(), preprocessMeltUI()]),
	kit: {
		adapter: adapterStatic()
	},
	vitePlugin: {
		// experimental: {
		// 	inspector: { holdMode: true },
		// }
	}
};

export default config;
