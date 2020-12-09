const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 定义nodejs环境变量：决定使用browserslist哪个环境
process.env.NODE_ENV = "production";

// 复用loader
const commonCssLoader = [
  // "style-loader",
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      // 图片路径不正常显示
      publicPath: "../",
    },
  },
  "css-loader",
  {
    // 还需要在package.json中配置browserslist内容
    loader: "postcss-loader",
    options: {
      postcssOptions: { plugins: [require("postcss-preset-env")()] },
    },
  },
];

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
        use: [...commonCssLoader],
      },
      {
        test: /\.less$/,
        use: [...commonCssLoader, "less-loader"],
      },
      /**
       *  正常来讲一个文件只能被一个loader处理
       *  当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序
       *  先执行 eslint 再执行 babel
       *  参数：enforce: "pre", 作用：优先执行
       */
      {
        // 在package.json中配置eslintConfig ->airbnb
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          fix: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                useBuiltIns: "usage",
                corejs: { version: 3 },
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
      {
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader",
        options: {
          limit: 40 * 1024,
          name: "[hash:10].[ext]",
          esModule: false,
          outputPath: "imgs",
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        exclude: /\.(html|js|css|less|png|jpg|gif)$/,
        loader: "file-loader",
        options: {
          name: "[hash:12].[ext]",
          outputPath: "media",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    // css生成单独文件
    new MiniCssExtractPlugin({
      filename: "css/built.css",
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  mode: "production",
};
