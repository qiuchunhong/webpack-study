const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 单入口
  // entry: "./src/js/index.js",
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
  // 单入口时：可以将node_modules中代码单独打包成一个chunk最终输出
  // 多入口时：自动分析多入口chunk中有没有公共的文件，如果有会单独打包成一个chunk
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  mode: "production",
};
