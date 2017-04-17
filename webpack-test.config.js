var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var WebpackShellPlugin = require('webpack-shell-plugin');

var loaders = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel'
  },
  {
    test: /\.css$/,
    loader: 'style!css!postcss'
  }
];

var config = {
  entry: './all-tests.js',
  output: {
    filename: 'testBundle.js',
    // libraryTarget: 'umd',
    // library: 'SimpleBar'
  },
  externals: [nodeExternals()],
  node: {
    fs: 'empty'
  },
  devServer: {
    contentBase: '.',
    port: 8787
  },
  module: {
    loaders
  }
};


module.exports = config;