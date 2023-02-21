const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const nodeEnv = process.env.NODE_ENV;
const backendUrl = process.env.BACKEND_URL;
const isDev = nodeEnv === 'development';
const babelPlugins = isDev ? ['react-refresh/babel'] : [];

console.log('nodeEnv', nodeEnv, isDev)

const publicPath = '/';

const smp = new SpeedMeasurePlugin();
const cleanWebpackPlugin = new CleanWebpackPlugin();
const reactRefreshWebpackPlugin = new ReactRefreshWebpackPlugin();
const htmlWebpackPlugin = new HTMLWebpackPlugin({
  title: 'qBotica HRMS',
  template: './public/index.html',
  filename: "./index.html",
  favicon: "./public/favicon.png",
});
const FZZ = new MiniCssExtractPlugin()
const uglifyJSPlugin = new UglifyJsPlugin()
const jqueryWebpackPlugin = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  'window.jQuery': 'jquery'
})

const devPlugins = [
  reactRefreshWebpackPlugin,
  htmlWebpackPlugin,
  miniCssPlugin,
  uglifyJSPlugin,
  jqueryWebpackPlugin
];

const prodPlugins = [
  cleanWebpackPlugin,
  htmlWebpackPlugin,
  jqueryWebpackPlugin
];

module.exports = smp.wrap({
  mode: 'development',
  entry: {
    app: './src/index.js',
  },
  // output: {
  //   // publicPath: isDev ? `http://${devHost}:3000/` : '/',
  //   filename: isDev ? '[name].js' : '[name].bundle.js',
  //   publicPath: publicPath,
  //   // assetModuleFilename: "assets/img/[hash][ext][query]"
  // },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: 'only',
    port: 8001,
    // open: true,
    historyApiFallback: true,
    // historyApiFallback: {
    //   disableDotRule: true
    // },
    devMiddleware: {
      publicPath: 'auto',
    },
  },

  // plugins: [
  //   new HTMLWebpackPlugin({

  //   }),
  //   new MiniCssExtractPlugin(),
  //   new webpack.ProvidePlugin({
  //     $: 'jquery',
  //     jQuery: 'jquery',
  //     'window.jQuery': 'jquery'
  //   })
  // ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env'],
          plugins: babelPlugins,
        },
      },

      {
        test: /\.(css|scss)$/i,
        use: [{
          loader: miniCssPlugin.loader,
        },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },


      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
      },

      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        type: "asset",
      },
    ]
  },

  optimization: {
    minimizer: [new UglifyJsPlugin()],
    // splitChunks: {
    //   chunks: 'all',
    //   name: false,
    // },
  },
  // devtool: !isDev && 'source-map',
  devtool: 'eval',
  performance: {
    hints: process.env.NODE_ENV === 'production' ? "warning" : false
  },
  plugins: isDev ? devPlugins : prodPlugins,


  // plugins: isDev ? devPlugins : prodPlugins,
  // proxy: {
  //   '/api': 'http://localhost:3000',
  //   changeOrigin: true,
  // },
})

