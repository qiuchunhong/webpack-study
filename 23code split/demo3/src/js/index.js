function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

console.log(sum(1, 2, 3, 4, 5));

/**
 * 通过js代码，让某个文章被单独打包成一个chunk
 * import动态导入语法：能将某个文件单独打包
 * 可修改打包后的文件名称如下修改：
 */

import(/* webpackChunkName:'test' */ "./test")
  .then(({ mul, sub }) => {
    // 文件加载成功
    console.log(mul(3, 4));
  })
  .catch(() => {
    console.log("文件加载失败");
  });
