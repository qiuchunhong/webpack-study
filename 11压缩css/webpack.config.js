const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 安装： npm i mini-css-extract-plugin -D
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 压缩css: 安装 使用
// 安装： npm i optimize-css-alssets-webpack-plugin -D
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

// 设置nodejs环境变量,修改为开发环境
process.env.NODE_ENV = "development";

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build"),
    publicPath: "./",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // style-loader作用：在js中创建一个style标签，将css内容放时去
          // "style-loader",
          // MiniCssExtractPlugin
          MiniCssExtractPlugin.loader,
          "css-loader",
          // 修改loader的配置
          {
            // 还需要在package.json中配置browserslist内容
            loader: "postcss-loader",
            options: {
              postcssOptions: { plugins: [require("postcss-preset-env")()] },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/built.css",
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  mode: "development",
};
