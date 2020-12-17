const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "production",
  externals: {
    // 拒绝jquery这个包被打包进来，在index.html中引入jquery的cdn，加快速度
    jquery: "jquery",
  },
};
