/*

loader:   1.下载  2.使用（配置loader）
plugins:  1.下载  2.引入  3.使用


*/

const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [],
  },
  plugins: [
    // 安装 npm i html-webpack-plugin -D
    // 使用：new HtmlWebpackPlugin(), 功能是默认会创建一个空的Html文件，自动引入打包输出的所有资源（js/css）
    // 问题：需要有结构的html
    // 解决：加template，如下
    new HtmlWebpackPlugin({
      // 复制'./src/index.html'文件，并自动引入打包输出的所有资源（js/css）
      template: "./src/index.html",
    }),
  ],
  mode: "development",
};
