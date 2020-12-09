const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 安装： npm i mini-css-extract-plugin -D
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          "css-loader",
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
  ],
  mode: "development",
};
