import { readFileSync } from "fs";
import { sveltekit } from "@sveltejs/kit/vite";
import { timeFormat } from "d3";
import path from "path";
import svg from "vite-plugin-svgstring";
import dsv from "@rollup/plugin-dsv";
import { esbuildCommonjs, viteCommonjs } from "@originjs/vite-plugin-commonjs";

const { version } = JSON.parse(readFileSync("package.json", "utf8"));
const timestamp = timeFormat("%Y-%m-%d-%H:%M")(new Date());

const config = {
	define: {
		__VERSION__: JSON.stringify(version),
		__TIMESTAMP__: JSON.stringify(timestamp)
	},
	plugins: [sveltekit(), dsv(), svg(), viteCommonjs()],
	resolve: {
		alias: {
			$actions: path.resolve("./src/actions"),
			$components: path.resolve("./src/components"),
			$data: path.resolve("./src/data"),
			$routes: path.resolve("./src/routes"),
			$stores: path.resolve("./src/stores"),
			$styles: path.resolve("./src/styles"),
			$svg: path.resolve("./src/svg"),
			$utils: path.resolve("./src/utils"),
			$shaders: path.resolve("./src/shaders")
		}
	},
	ssr: {
		noExternal: ["three", "threestrap", "mathbox", "shadergraph", "postprocessing"]
	},
	optimizeDeps: {
		esbuildOptions: {
			plugins: [esbuildCommonjs(["mathbox"])]
		}
	}
};

export default config;
