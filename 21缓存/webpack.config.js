const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * 缓存：
 * 1. babel缓存：
 *  使用：cacheDirectory:true
 *  作用：让第二次打包构建速度更快
 *  问题：有文件修改，浏览器因缓存未加载新文件
 *
 * 2. 文件资源缓存
 *  使用：
 *        filename: "js/built.[contenthash].js",
 *        filename: "css/built.[contenthash].css",
 *  作用：让代码上线运行缓存更好使用
 *  hash: 每次webpack构建时会生成一个唯一的hash值。
 *      问题：因为js和css同时使用一个hash值。
 *            如果重新打包，会导所有缓存失效。（可能只修改了一个文件）
 *  chunkhash：根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样
 *      问题：js和css的hash值还是一样的
 *            因为css是在js中被引入的，所有同属于一个chunk
 *  contenthash：根据文件的内容生成hash值。不同文件hash值一定不一样
 *
 *
 */

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
    filename: "js/built.[contenthash].js",
    path: resolve(__dirname, "build"),
    publicPath: "./",
  },
  module: {
    rules: [
      {
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
        // oneOf:以下Loader只会匹配一个
        // 注意：不能有两个配置处理同一种类型文件
        // 所以把js eslint-loader 提取到上面
        oneOf: [
          {
            test: /\.css$/,
            use: [...commonCssLoader],
          },
          {
            test: /\.less$/,
            use: [...commonCssLoader, "less-loader"],
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
              // 开启babel缓存
              // 第二次构建时会读取之前的缓存
              // 使用时发现缓存未生效：看浏览器是否开启了 Disabled cache
              cacheDirectory: true,
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
      filename: "css/built.[contenthash].css",
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  mode: "production",
};
