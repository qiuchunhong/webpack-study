const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 单入口
  // entry: "./src/js/index.js",
  // 多入口
  entry: {
    index: "./src/js/index.js",
    test: "./src/js/test.js",
  },
  output: {
    filename: "js/[name].[contenthash].js",
    path: resolve(__dirname, "build"),
    publicPath: "./",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  mode: "production",
};
