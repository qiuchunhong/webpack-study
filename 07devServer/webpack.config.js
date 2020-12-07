const { resolve } = require("path");
const HtmlWebpackPlugn = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        exclude: /\.(css||js||html)$/,
        loader: "file-loader",
        options: {
          name: "[hash:10],[ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugn({
      template: "./src/index.html",
    }),
  ],
  mode: "development",

  // 开发服务器 dev-server:用来自动化（自动编译、自动打开浏览器、自动刷新浏览器）
  // 特点：只会在内存中编译打包，不会有任何输出
  // 安装： npm i webpack-dev-server -D
  // 运行 npx webpack-dev-server
  // 问题： Cannot find module 'webpack-cli/bin/config-yargs'
  // 运行 npx webpack serve
  devServer: {
    // 项目构建后的路径
    contentBase: resolve(__dirname, "build"),
    // 使用Gzip压缩
    compress: true,
    // 启动自动打开浏览器
    open: true,
    // 端口号
    port: 3000,
  },
};
