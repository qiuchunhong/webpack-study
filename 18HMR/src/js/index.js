console.log("index文件被加载了");
import print from "./print.js";

import "../css/index.less";

import "../css/iconfont.css";

function addX(x, y) {
  return x + y;
}

console.log(addX(4, 23));
console.log(addX(4, 443));

print();

if (module.hot) {
  // 一旦module.hot 为true,说明开启了HMR功能 -->让HMR功能生效
  module.hot.accept("./print.js", () => {
    // 方法会监听printA.js文件的变化，一旦发生变化，其他模块不会重新打包构建。
    // 会执行后面的回调函数
    printA();
  });
}
