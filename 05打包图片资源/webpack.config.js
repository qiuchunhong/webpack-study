const { resolve } = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build"),
    publicPath: "./", // html-loader引入图片报错
  },
  module: {
    rules: [
      {
        test: /\.less/,
        // 使用多个loader时，用use
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        // 处理图片资源
        // 问题：默认处理不了html文件中的<img>图片
        test: /\.(png|jpg|jpeg)$/,
        // 使用一个loader时，直接用loader就行
        // 下载loader: npm i url-loader file-loader -D
        loader: "url-loader",
        options: {
          // 图片大于40kb，就会被base64处理
          // 优点：减少请求数量（减轻服务器压力）
          // 缺点：文件体积会更大
          limit: 40 * 1024,
          // 给图片重命名
          // [hash:10]:取hash值的前10位
          // [ext]:取文件原来的扩展名
          name: "[hash:10].[ext]",
          // 问题：url-loader默认是使用es6 module解析的。而html-loader用的是commonjs解析的
          // 所以解析时会报错
          // 解决：关闭url-loader的es6的module，使用commonjs
          esModule: false,
        },
      },
      {
        // 处理.html文件中的<img>图片
        // 负责引入img,从而被url-loader处理
        // 安装 html-loader
        test: /\.html$/,
        loader: "html-loader",
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
