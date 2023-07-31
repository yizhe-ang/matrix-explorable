// vite.config.js
import { readFileSync } from "fs";
import { sveltekit } from "file:///Users/angyizhe/code/VIS/matrix-arcade/node_modules/@sveltejs/kit/src/exports/vite/index.js";
import { timeFormat } from "file:///Users/angyizhe/code/VIS/matrix-arcade/node_modules/d3/src/index.js";
import path from "path";
import svg from "file:///Users/angyizhe/code/VIS/matrix-arcade/node_modules/vite-plugin-svgstring/index.js";
import dsv from "file:///Users/angyizhe/code/VIS/matrix-arcade/node_modules/@rollup/plugin-dsv/dist/es/index.js";
import { esbuildCommonjs, viteCommonjs } from "file:///Users/angyizhe/code/VIS/matrix-arcade/node_modules/@originjs/vite-plugin-commonjs/lib/index.js";
var { version } = JSON.parse(readFileSync("package.json", "utf8"));
var timestamp = timeFormat("%Y-%m-%d-%H:%M")(/* @__PURE__ */ new Date());
var config = {
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
      $utils: path.resolve("./src/utils")
    }
  },
  ssr: {
    noExternal: ["three", "threestrap", "mathbox", "shadergraph"]
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildCommonjs(["mathbox"])]
    }
  }
};
var vite_config_default = config;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYW5neWl6aGUvY29kZS9WSVMvbWF0cml4LWFyY2FkZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FuZ3lpemhlL2NvZGUvVklTL21hdHJpeC1hcmNhZGUvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FuZ3lpemhlL2NvZGUvVklTL21hdHJpeC1hcmNhZGUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyByZWFkRmlsZVN5bmMgfSBmcm9tIFwiZnNcIjtcbmltcG9ydCB7IHN2ZWx0ZWtpdCB9IGZyb20gXCJAc3ZlbHRlanMva2l0L3ZpdGVcIjtcbmltcG9ydCB7IHRpbWVGb3JtYXQgfSBmcm9tIFwiZDNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgc3ZnIGZyb20gXCJ2aXRlLXBsdWdpbi1zdmdzdHJpbmdcIjtcbmltcG9ydCBkc3YgZnJvbSBcIkByb2xsdXAvcGx1Z2luLWRzdlwiO1xuaW1wb3J0IHsgZXNidWlsZENvbW1vbmpzLCB2aXRlQ29tbW9uanMgfSBmcm9tIFwiQG9yaWdpbmpzL3ZpdGUtcGx1Z2luLWNvbW1vbmpzXCI7XG5cbmNvbnN0IHsgdmVyc2lvbiB9ID0gSlNPTi5wYXJzZShyZWFkRmlsZVN5bmMoXCJwYWNrYWdlLmpzb25cIiwgXCJ1dGY4XCIpKTtcbmNvbnN0IHRpbWVzdGFtcCA9IHRpbWVGb3JtYXQoXCIlWS0lbS0lZC0lSDolTVwiKShuZXcgRGF0ZSgpKTtcblxuY29uc3QgY29uZmlnID0ge1xuXHRkZWZpbmU6IHtcblx0XHRfX1ZFUlNJT05fXzogSlNPTi5zdHJpbmdpZnkodmVyc2lvbiksXG5cdFx0X19USU1FU1RBTVBfXzogSlNPTi5zdHJpbmdpZnkodGltZXN0YW1wKVxuXHR9LFxuXHRwbHVnaW5zOiBbc3ZlbHRla2l0KCksIGRzdigpLCBzdmcoKSwgdml0ZUNvbW1vbmpzKCldLFxuXHRyZXNvbHZlOiB7XG5cdFx0YWxpYXM6IHtcblx0XHRcdCRhY3Rpb25zOiBwYXRoLnJlc29sdmUoXCIuL3NyYy9hY3Rpb25zXCIpLFxuXHRcdFx0JGNvbXBvbmVudHM6IHBhdGgucmVzb2x2ZShcIi4vc3JjL2NvbXBvbmVudHNcIiksXG5cdFx0XHQkZGF0YTogcGF0aC5yZXNvbHZlKFwiLi9zcmMvZGF0YVwiKSxcblx0XHRcdCRyb3V0ZXM6IHBhdGgucmVzb2x2ZShcIi4vc3JjL3JvdXRlc1wiKSxcblx0XHRcdCRzdG9yZXM6IHBhdGgucmVzb2x2ZShcIi4vc3JjL3N0b3Jlc1wiKSxcblx0XHRcdCRzdHlsZXM6IHBhdGgucmVzb2x2ZShcIi4vc3JjL3N0eWxlc1wiKSxcblx0XHRcdCRzdmc6IHBhdGgucmVzb2x2ZShcIi4vc3JjL3N2Z1wiKSxcblx0XHRcdCR1dGlsczogcGF0aC5yZXNvbHZlKFwiLi9zcmMvdXRpbHNcIilcblx0XHR9XG5cdH0sXG5cdHNzcjoge1xuXHRcdG5vRXh0ZXJuYWw6IFtcInRocmVlXCIsIFwidGhyZWVzdHJhcFwiLCBcIm1hdGhib3hcIiwgXCJzaGFkZXJncmFwaFwiXVxuXHR9LFxuXHRvcHRpbWl6ZURlcHM6IHtcblx0XHRlc2J1aWxkT3B0aW9uczoge1xuXHRcdFx0cGx1Z2luczogW2VzYnVpbGRDb21tb25qcyhbXCJtYXRoYm94XCJdKV1cblx0XHR9XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1MsU0FBUyxvQkFBb0I7QUFDalUsU0FBUyxpQkFBaUI7QUFDMUIsU0FBUyxrQkFBa0I7QUFDM0IsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sU0FBUztBQUNoQixPQUFPLFNBQVM7QUFDaEIsU0FBUyxpQkFBaUIsb0JBQW9CO0FBRTlDLElBQU0sRUFBRSxRQUFRLElBQUksS0FBSyxNQUFNLGFBQWEsZ0JBQWdCLE1BQU0sQ0FBQztBQUNuRSxJQUFNLFlBQVksV0FBVyxnQkFBZ0IsRUFBRSxvQkFBSSxLQUFLLENBQUM7QUFFekQsSUFBTSxTQUFTO0FBQUEsRUFDZCxRQUFRO0FBQUEsSUFDUCxhQUFhLEtBQUssVUFBVSxPQUFPO0FBQUEsSUFDbkMsZUFBZSxLQUFLLFVBQVUsU0FBUztBQUFBLEVBQ3hDO0FBQUEsRUFDQSxTQUFTLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsYUFBYSxDQUFDO0FBQUEsRUFDbkQsU0FBUztBQUFBLElBQ1IsT0FBTztBQUFBLE1BQ04sVUFBVSxLQUFLLFFBQVEsZUFBZTtBQUFBLE1BQ3RDLGFBQWEsS0FBSyxRQUFRLGtCQUFrQjtBQUFBLE1BQzVDLE9BQU8sS0FBSyxRQUFRLFlBQVk7QUFBQSxNQUNoQyxTQUFTLEtBQUssUUFBUSxjQUFjO0FBQUEsTUFDcEMsU0FBUyxLQUFLLFFBQVEsY0FBYztBQUFBLE1BQ3BDLFNBQVMsS0FBSyxRQUFRLGNBQWM7QUFBQSxNQUNwQyxNQUFNLEtBQUssUUFBUSxXQUFXO0FBQUEsTUFDOUIsUUFBUSxLQUFLLFFBQVEsYUFBYTtBQUFBLElBQ25DO0FBQUEsRUFDRDtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0osWUFBWSxDQUFDLFNBQVMsY0FBYyxXQUFXLGFBQWE7QUFBQSxFQUM3RDtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ2IsZ0JBQWdCO0FBQUEsTUFDZixTQUFTLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7QUFBQSxJQUN2QztBQUFBLEVBQ0Q7QUFDRDtBQUVBLElBQU8sc0JBQVE7IiwKICAibmFtZXMiOiBbXQp9Cg==
