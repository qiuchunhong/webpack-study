const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * 1. string --> "./src/index.js"
 * 单入口
 * 打包形成一个chunk，输出一个bundle文件。
 * 默认的chunk的名称是：main
 * 2. array  --> f["./src/index.js", "./src/add.js"]
 * 多入口
 * 所有入口文件最终只会形成一个chunk，输出也只有一个bundle文件
 * 默认的chunk的名称是：main
 *    --》只有在HMR功能中让html热更新生效
 * 3. object  -->  { index: "./src/index.js", add: "./src/add.js", }
 * 多入口
 * 有几个入口文件就形成几个chunk，输出几个bundle文件
 * 此时chunk的名称是key
 *  -->特殊用法
 *  {
      // 所有入口文件最终只会形成一个chunk，输出只有一个bundle文件。
      index: ["./src/index.js", "./src/count.js"],
      // 形成一个chunk，输出一个bundle文件。
      add: "./src/add.js",
    }
 *
 */

module.exports = {
  entry: {
    index: ["./src/index.js", "./src/count.js"],
    add: "./src/add.js",
  },
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build"),
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: "development",
};
