/*
webpack 配置文件

webpack 使用的是nodejs 的commonjs

*/

const { resolve } = require("path");

module.exports = {
  // 入口文件
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      // 详细loader配置
      // 不同文件必须配置不同的loader处理
      {
        // 检测文件类型
        test: /\.css$/,
        // 使用哪些loader进行处理
        use: [
          // 两个loader执行顺序：从下至上 从右向左 依次执行 (css-loader->style-loader)
          // 创建style标签，将js中的样式资源插入进去，添加到head中生效
          "style-loader",
          // 将css文件变成commonjs模块加载到js中，里面内容是样式字符串
          "css-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          // 3
          "style-loader",
          // 2
          "css-loader",
          // 1 将less文件编译成css文件
          // 安装 less / less-loader
          "less-loader",
        ],
      },
    ],
  },
  plugins: [],
  mode: "development",
};
