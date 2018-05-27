const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  entry: {
    main:['webpack-hot-middleware/client', './src/client/index.tsx']
  },
  output: {
    filename: 'build/[name]-bundle.js'
  },
  plugins: [
    //new BundleAnalyzerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'html-loader?interpolate=require!src/assets/index.html'
    })
  ],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|eot|woff|woff2|ttf)$/i,
        use: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
}