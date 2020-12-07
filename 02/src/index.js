/*

index.js webpack 入口文件

1.运行指令：
  开发环境：  webpack ./src/index.js -o ./build --mode=development
            webpack 入口文件 output输出到 出口文件  --mode=dev环境
  生产环境：  webpack ./src/index.js -o ./build --mode=production
            webpack 入口文件 output输出到 出口文件  --mode=生产环境

2.结论
  webpack 能处理js/json资源，不能处理css/img资源
  生产环境比开发环境多了一个压缩js代码
*/

import json from "./index.json";
console.log(json);

import "./index.css";

function add(x, y) {
  console.log(x + y);
}
add(3, 4);
