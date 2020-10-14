const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackTemplate = require('./client/webpack/template');

module.exports = ({ production, debug, NODE_ENV }) => ({
  mode: NODE_ENV,
  entry: './client/app/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/bundle.js',
  },
  optimization: {
    minimizer: (production && !debug) ? [new OptimizeCSSAssetsPlugin({})] : [],
  },

  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          ...((production || debug) ? [MiniCssExtractPlugin.loader] : []),
          ...((!production && !debug) ? ['style-loader'] : []),
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: (production && !debug) ? '[hash:base64:5]' : '[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                indentWidth: 2,
                outputStyle: 'expanded',
                includePaths: [
                  path.resolve(__dirname, 'client/app/styles'),
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/images',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      templateContent: webpackTemplate,
    }),
    ...((production || debug) ? [
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].min.css',
        chunkFilename: '[id].css',
      }),
    ] : []),
  ],

  devServer: {
    historyApiFallback: true,
    open: true,
  },
});
