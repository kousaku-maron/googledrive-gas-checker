/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const GasPlugin = require('gas-webpack-plugin')
const Es3ifyPlugin = require('es3ify-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  context: __dirname,
  entry: {
    main: path.resolve(__dirname, 'src', 'index.ts')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin(
      [{ from: path.resolve(__dirname, 'src', 'appsscript.json'), to: path.resolve(__dirname, 'dist'), force: true }],
      {
        copyUnmodified: true
      }
    ),
    new GasPlugin(),
    new Es3ifyPlugin()
  ]
}
