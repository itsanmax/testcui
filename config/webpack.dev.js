const path = require('path')
const paths = require('./paths');
const Dotenv = require('dotenv-webpack')

//const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production';
module.exports = {
  entry: [paths.src + '/index.js'],
    resolve: {
        alias: {
          Env_Path: paths.src + "/environments/environment.dev"
        },
        modules: ['node_modules'],
        extensions: ['*', '.js', '*.jsx', '*.css', '*.scss'],
        symlinks: false,
        cacheWithContext: false
        
    },
  mode: 'development',
  devtool: 'eval-source-map',
  //devtool:'eval-cheap-module-source-map',
  cache:true,
  watchOptions: {
    aggregateTimeout: 100,
    poll: true,
  },
  output: {
    path: paths.build,
    publicPath: '',
    library: 'ChrLBComponent',
    libraryTarget: 'umd',
    filename: "main.js",
    clean:  true
  },
  devServer: {
    static: {
      directory: paths.build,
    },
    historyApiFallback: true,
    host:'denmark.local',
    port: 8082,
    // open: { 
    //   app: {
    //     name: 'google-chrome',
    //     arguments: ['--incognito', '--new-window'],
    //   },
    //   target:['?ssoToken=1aad0864722e4cb39ab0a702ccc221ce&baseUrl=https://qc10denmark.timesinternet.in']
    // },
    open:['?ssoToken=40f8e1247ab14f10bd2575bdfa5a09e7&baseUrl=https://qc10denmark.timesinternet.in'],
    //hot:true,
   // hot: 'only',
    client: {
      overlay: {
        errors: true,
        warnings: false
      },
      progress: false,
    },
     
  },
  stats: {
    warnings: false,
    modules: false,
    hash: false,
    children: false,
  },
  target: "web",
  module: {
    rules: [
      // ... other rules
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          // ... other loaders
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                // ... other plugins
                require.resolve('react-refresh/babel'),
              ]
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader'
        ]
    },
    {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
            "css-loader",
            'sass-loader',
        ],
    },

    {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    },
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options:{
            name:'[name].[ext]',
            outputPath:'pictures/webstory'
        }
    },
    {
        test: /\.(eot|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
            loader: "file-loader",
            options: {
                publicPath: '/',
                name: 'fonts/[hash].[ext]',
                limit: 5000,
                mimetype: 'application/font-woff'
            }
        }]
    }
    ],
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
    //new ReactRefreshWebpackPlugin(),
    // new ReactRefreshWebpackPlugin({
    //   overlay: false,

    // }),
    new HtmlWebpackPlugin({ template: paths.src + '/index.html', favicon: paths.src + "/favicon.png"}),
  
  ]
}