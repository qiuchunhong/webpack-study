# webpack 学习

webpack 学习视频： [尚硅谷 2020 最新版 Webpack5 实战教程(从入门到精通)](https://www.bilibili.com/video/BV1e7411j7T5?p=1).

### 打包

```
  webpack
```

### 运行

```
  npx webpack serve
```

### webpack 性能优化

- 开发环境性能优化
- 生产环境性能优化

#### 开发环境性能优化

- 优化打包构建速度
  - HRM :修改后单独打包功能
- 优化代码调试
  - source-map

#### 生产环境性能优化

- 优化打包构建速度
  - oneof
  - babel 缓存
  - 多进程打包
  - externals ：不打包某些库,需要手动引入 cdn 库
  - dll：单独打包某些库,不需要手动引入
- 优化代码运行的性能
  - 缓存（hash-chunkhash-contenthash）
  - tree shaking ：去除没用的
  - code split
  - 懒加载/预加载
  - pwa ：离线可访问
