# code split

```
optimization: {
  splitChunks: {
    chunks: "all",
  },
},
```

- 单入口时：可以将 node_modules 中代码单独打包成一个 chunk 最终输出
- 多入口时：自动分析多入口 chunk 中有没有公共的文件，如果有会单独打包成一个 chunk

## 单入口 -> 打包成一个文件，node_modules 单独打包

```
entry: "./src/js/index.js",
```

## 多入口 -> 打包多个文件，通用 node_modules 单独打包

```
entry: {
  index: "./src/js/index.js",
  test: "./src/js/test.js",
},
```

## import 动态导入语法 -> 单入口 打包多个文件

- 通过 js 代码，让某个文章被单独打包成一个 chunk
- import 动态导入语法：能将某个文件单独打包
- 可修改打包后的文件名称如下修改：

index.js 中加入代码:

```
import(/* webpackChunkName:'test' */ "./test")
  .then(({ mul, sub }) => {
    // 文件加载成功
    console.log(mul(3, 4));
  })
  .catch(() => {
    console.log("文件加载失败");
  });
```
