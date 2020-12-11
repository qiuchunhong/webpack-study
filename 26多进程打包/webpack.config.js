const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

/**
 * 安装：npm i threah-loader -D
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
            use: [
              /**
               * 开启多进程打包
               * 进程启动大概需要600ms,进程通信也有开销
               * 只有工作消耗时间比较长，才需要多进程打包
               */
              {
                loader: "threah-loader",
                options: {
                  workers: 2, // 进程2个
                },
              },
              {
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
            ],
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
    new WorkboxWebpackPlugin.GenerateSW({
      /**
       * 1.帮助serviceWorker快速启动
       * 2.删除旧的 serviceWorker
       *
       * 打包时，在build目录生成一个 serviceWorker 配置文件
       *
       * 生成后，在index.js后注册serviceWorker，然后启动服务
       */
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  mode: "production",
  devtool: "source-map",
};
