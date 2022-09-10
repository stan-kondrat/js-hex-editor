import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import sveltePreprocess from "svelte-preprocess";
import svelteDts from "svelte-dts";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";
import pkg from "./package.json";
import copy from 'rollup-plugin-copy'

const production = !process.env.ROLLUP_WATCH;

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, "$3")
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase());

export default {
	input: "src/index.ts",
  output: !production
    ? { file: pkg.module, format: "es" }
    : [
        { file: pkg.module, format: "es" },
        { file: pkg.main, format: "umd", name },
        { file: "dist/hex-editor.min.js", format: "umd", name, plugins: [terser()] },
      ],
	plugins: [
    svelteDts({ output: "dist/index.d.ts" }),
		svelte({
			preprocess: sveltePreprocess({ sourceMap: true }),
			compilerOptions: {
				dev: !production
			}
		}),
		copy({
			targets: [
				{ src: 'src/HexEditor.svelte', dest: 'dist-svelte' },
				{ src: 'src/Glyph.svelte', dest: 'dist-svelte' },
			],
		}),

		resolve({
			browser: true,
			dedupe: ["svelte"]
		}),
		css({ output: "hex-editor.css" }),
		commonjs(),
		typescript({
			sourceMap: true,
			inlineSources: true
		}),
	],
	watch: {
    	include: "src/**",
		clearScreen: false
	},
};
