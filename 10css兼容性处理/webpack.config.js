const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 安装： npm i mini-css-extract-plugin -D
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * 问题：配置browserslist后，webpack-dev-server热更新无效，需手动刷新才可以
 *
 * 解决方法：module.exports 中添加属性：target: "web",
 *
 */

// 设置nodejs环境变量,修改为开发环境
process.env.NODE_ENV = "development";

/**
 * 安装：
 *      npm i postcss-loader postcss-preset-env -D
 */

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
  ],
  mode: "development",
  target: "web",
};
