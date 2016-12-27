import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import includePaths from 'rollup-plugin-includepaths'
import localResolve from 'rollup-plugin-local-resolve'
import replace from 'rollup-plugin-replace'
import modular from 'modular-css/rollup'

let includePathOptions = {
  include: {},
  paths: ['src'],
  external: [],
  extensions: ['.js']
};

export default {
  entry: 'src/client/index.js',
  format: 'iife',
  plugins: [
    modular({
      css : 'public/css/bundle.css'
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'development' )
    }),
    includePaths(includePathOptions),
    localResolve(),
    nodeResolve({
      jsnext: true,
      main: true
    }),
  ],
  sourceMap: false,
  dest: 'public/js/bundle.js',
  external: [
    'react-dom',
    'react',
    'react-redux',
    'redux'
  ],
  globals: {
    react: 'React',
    'react-redux':'ReactRedux',
    'react-dom':'ReactDOM',
    'redux': 'Redux'
  }
}
