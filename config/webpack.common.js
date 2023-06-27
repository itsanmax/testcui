const paths = require('./paths');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin')
//const HtmlWebpackPlugin = require('html-webpack-plugin')
//const MiniCssExtractPlugin = require('mini-css-extract-plugin') // extract css to files

const webpack = require('webpack');

const devMode = process.env.NODE_ENV !== 'production';
//console.log("Build Mode : --", devMode ? 'development' : 'production')
module.exports = {
    entry: [paths.src + '/index.js'],
    resolve: {
        modules: ['node_modules'],
        extensions: ['*', '.js', '*.jsx', '*.css', '*.scss'],
        symlinks: false,
        cacheWithContext: false,
        alias: {
            Env_Path: paths.src + "/environments/environment.prod"
        }
    },
    plugins: [

        // new HtmlWebpackPlugin({ template: paths.src + '/index.html', favicon: paths.src + "/favicon.png" }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.src + '/assets',
                    to: 'assets',
                    globOptions: {
                        ignore: ['*.DS_Store'],
                        dot: true,
                        gitignore: true,
                    },
                    noErrorOnMissing: true
                },
            ],
        })
    ],

    // Determine how modules within the project are treated
    module: {
        rules: [
            // JavaScript: Use Babel to transpile JavaScript files
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
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
}