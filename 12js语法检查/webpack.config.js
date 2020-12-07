const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build"),
    publicPath: "./",
  },
  module: {
    rules: [
      /*
        es语法检查：eslint-loader eslint
          
        airbnb: 这个包将Airbnb的基本JS .eslintrc(没有React插件)作为可扩展的共享配置提供。

        eslint-config-airbnb-base eslint-plugin-import 

        package.json添加
        "eslintConfig": {
          "extends": "airbnb-base"
        },

      */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // 自动修复eslint的错误
          fix: true,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "development",
};
