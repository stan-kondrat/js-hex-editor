import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import sveltePreprocess from "svelte-preprocess";
import svelteDts from "svelte-dts";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";

const isWatch = !process.env.ROLLUP_WATCH;

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, "$3")
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase());

export default {
  input: "src/index.ts",
  output: isWatch
    ? { file: pkg.module, format: "es" }
    : [
        { file: pkg.module, format: "es" },
        { file: pkg.main, format: "umd", name },
        { file: "dist/index.min.js", format: "umd", name, plugins: [terser()] },
      ],
  plugins: [
    svelteDts({ output: "dist/index.d.ts" }),
    svelte({
      preprocess: sveltePreprocess({ sourceMap: !isWatch }),
    }),
    resolve(),
    typescript({
      sourceMap: !isWatch,
      inlineSources: !isWatch,
    }),
  ],
  watch: {
    include: "src/**",
  },
};
