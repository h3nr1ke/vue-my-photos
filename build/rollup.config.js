import vue from 'rollup-plugin-vue';
import css from 'rollup-plugin-css-only';
import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';

export default [{
    // ESM build to be used with webpack/rollup.
    input: 'src/main.js',
    output: {
      name: 'Lightbox',
      // format: 'esm',
      file: 'dist/lightbox.esm.js',
      exports: 'named',
      format: 'cjs'
    },
    plugins: [
      commonjs(),
      vue({
        css: true,
        compileTemplate: true,
      }),
      buble()
    ]
  },
  // UMD build.
  {
    input: 'src/main.js',
    output: {
      name: 'Lightbox',
      format: 'umd',
      file: 'dist/lightbox.umd.js',
      exports: 'named'
    },
    plugins: [
      commonjs(),
      vue({
        css: true,
        compileTemplate: true,
      }),
      buble()
    ]
  },
  // Browser build.
  {
    input: 'src/main.js',
    output: {
      name: 'Lightbox',
      // format: 'iife',
      format: 'cjs',
      file: 'dist/lightbox.js',
      exports: 'named'
    },
    plugins: [
      commonjs(),
      css(),
      vue({
        css: false,
        compileTemplate: true
      }),
      buble()
    ]
  }
]
