const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      /* 
        js兼容性处理： npm i babel-loader @babel/core -D
        1. 基本兼容性处理--> @babel/preset-env
          配置：options: {
          // 预设：指示babel做怎么样的兼容性处理
          presets: ["@babel/preset-env"],
        },
          问题：只能转换基本语法，如promise高级语法不能转换
        2. 全部js兼容性处理--> npm i @babel/polyfill -D
          使用方法：在index.js中引入即可。import "@babel/polyfill";
          问题：我们只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了
        3. 需要做兼容性处理的就做：按需加载 --> npm i core-js -D
          使用需如下配置
      */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          // 预设：指示babel做怎么样的兼容性处理
          presets: [
            [
              "@babel/preset-env",
              {
                // 按需加载
                useBuiltIns: "usage",
                // 指定core-js版本
                corejs: {
                  version: 3,
                },
                // 指定兼容性做到哪个版本的浏览器
                targets: {
                  chrome: "60",
                  firefox: "60",
                  ie: "9",
                  safari: "10",
                  edge: "17",
                },
              },
            ],
          ],
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
