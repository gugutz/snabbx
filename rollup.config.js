import {readFileSync} from 'fs'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

const pkg = JSON.parse(readFileSync('./package.json'))
const dependencies = Object.keys(pkg.dependencies || {})

export default {
  entry: 'lib/index.js',
  external: dependencies,
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: [['env', {modules: false}]],
      babelrc: false
    }),
    nodeResolve(),
    commonjs({
      include: 'node_modules/**'
    })
  ],
  targets: [
    {
      format: 'cjs',
      dest: 'dist/snabbx.js'
    },
    {
      format: 'es',
      dest: 'dist/snabbx.es.js'
    }
  ]
}
