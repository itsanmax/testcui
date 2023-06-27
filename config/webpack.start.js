

// webpack.start.js

const path = require('path')
const paths = require('./paths');
const Dotenv = require('dotenv-webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')


var BUILD_DIR = paths.build;
var APP_DIR = path.resolve(__dirname, '../src');
const TEMP_PATH = path.join(__dirname, "../public", "index.html");


module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  cache: true,
  stats: {
    warnings: false,
    children: false,
  },
  watchOptions: {
    aggregateTimeout: 100,
    poll: true,
  },
  output: {
    filename: "main.js",
    path: BUILD_DIR,
    library: 'ChrLBComponent',
    libraryTarget: 'umd',
    publicPath: '/',
    clean: true,
  },
  plugins: [
    new Dotenv({
      path: './.env.local',
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
      defaults: false // load '.env.defaults' as the default values if empty.
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: TEMP_PATH,
      favicon: APP_DIR + "/favicon.png",
    //  inject: false,
      meta: {
        charset: { charset: 'utf-8' },
        viewport: 'width=device-width, initial-scale=1'
      },
   //   minify: false
    }),
  ].filter(Boolean),
  devServer: {
    historyApiFallback: true,
    //contentBase: BUILD_DIR,
    open: {
      app: {
        name: 'Google Chrome',
        arguments: ['--disable-web-security']
      }
    },
   // openPage: '?ssoToken=9b3590d1fe244cf19c56e8d0a404e8f7',
   // writeToDisk: true,
   // disableHostCheck: true,
   // watchContentBase: true,
    hot: true,
    client: {
      progress: true,
      reconnect: 5,
    },

    // watchOptions: {
    //   ignored: /node_modules/,
    // },
    //progress: true,
    static: {
      directory: path.join(__dirname, "../dist"),
    },
    port: 3000,
  },
  target: "web",
  module: {
    // exclude node_modules
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  // pass all js files through Babel
  resolve: {
    alias: {
      Env_Path: APP_DIR + "/environments/environment.dev"
    },
    modules: [APP_DIR, 'node_modules'],
    extensions: ["*", ".js", ".jsx"],
  }
});