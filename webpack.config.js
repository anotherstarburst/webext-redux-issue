const webpack = require('webpack');

const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const WriteFilePlugin = require('write-file-webpack-plugin');

const mainfestPath = path.join('src', `manifest.json`);

const fileExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'eot',
  'otf',
  'svg',
  'ttf',
  'woff',
  'woff2',
];

const alias = {};

const options = {
  mode: 'development',
  entry: {
    background: path.join(__dirname, 'src', 'background.js'),
    content: path.join(__dirname, 'src', 'content_scripts', 'index.js'),
    iframe: path.join(
      __dirname,
      'src',
      'content_scripts',
      'iframe',
      'index.js'
    ),
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: new RegExp(`.(${fileExtensions.join('|')})$`),
        loader: 'file-loader?name=[name].[ext]',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias,
    extensions: fileExtensions
      .map((extension) => `.${extension}`)
      .concat(['.jsx', '.js', '.css']),
  },
  plugins: [
    // clean the build folder
    new CleanWebpackPlugin(),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new CopyWebpackPlugin([
      {
        from: mainfestPath,
        to: 'manifest.json',
        transform(content, absoluteFrom) {
          return Buffer.from(JSON.stringify(JSON.parse(content.toString())));
        },
      },
    ]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'background.html'),
      filename: 'background.html',
      chunks: ['background'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(
        __dirname,
        'src',
        'content_scripts',
        'iframe',
        'iframe.html'
      ),
      filename: 'iframe.html',
      chunks: ['iframe'],
    }),
    new WriteFilePlugin(),
  ],
};

module.exports = options;
