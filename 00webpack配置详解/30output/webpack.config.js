const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "js/[name].js",
    path: resolve(__dirname, "build"),
    // 所有资源引入公共路径前缀 --> 'imgs/a.jpg'  -->'/imgs/a.jpg'
    publicPath: "/",
    //非入口chunk的名称，index.js如下引用：
    // import("./add").then(({ default: add }) => {
    //   console.log(add(3, 3));
    // });
    chunkFilename: "js/[name]_chunk.js",
    // 整个库向外暴露的变量名
    // 打包后main.js中var main = {}
    library: "[name]",
    libraryTarget: "window", // 变量名添加到哪个上 browser window.main =
    // libraryTarget: "global", // 变量名添加到哪个上 node
    // libraryTarget: "commonjs",
    auxiliaryComment: "afasffe Comment",
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: "development",
};
