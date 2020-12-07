const { resolve } = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/build.js",
    path: resolve(__dirname, "build"),
    publicPath: "./",
  },
  module: {
    rules: [
      // less
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      // css
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // 图片
      {
        test: /\.(gif|png|jpg)$/,
        loader: "url-loader",
        options: {
          limit: 40 * 1024,
          name: "[hash:10].[ext]",
          esModule: false,
          outputPath: "imgs",
        },
      },
      // html中的<img>
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      // 其他资源
      {
        exclude: /\.(html|js|css|less|png|jpg|gif)$/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
          outputPath: "media",
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
  devServer: {
    contentBase: resolve(__dirname, "build"),
    compress: true,
    open: true,
    port: 3000,
  },
};
