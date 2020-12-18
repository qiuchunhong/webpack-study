const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "js/[name].js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // 多个loader使用use
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        // 排除node_modules下的js文件
        exclude: /node_modules/,
        // 只检查scr下的js文件
        include: resolve(__dirname, "src"),
        // 优先执行
        enforce: "pre",
        // 延后执行
        // enforce: "post",
        // 单个loader用loader
        loader: "eslint-loader",
        options: {},
      },
      {
        // 以下配置只会生效一个
        oneof: [],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: "development",
};
