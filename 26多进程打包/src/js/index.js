import '../css/index.css';

import { mul } from './test';

function sun(...args) {
  return args.reduce((p, c) => p + c, 0);
}

console.log(sun(1, 2, 3, 4, 5));

console.log(mul(3, 4));

/**
 * 问题1：eslint不认识 window/navigator全局变量
 * 解决：需要修改package.json 文件中的eslintConfig配置

    "env": {
      "browser": true // 支持浏览器端全局变量
    }

    问题2：serviceWorker代码必须运行在服务器上
    --> nodejs
    -->
      npm i serve -g  // 全局安装
      serve -s build  //  启动服务，将build目录下所有资源作为静态资源暴露出去
 */

// 注册 serviceWorker
// 处理兼容性问题

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('注册成功');
      })
      .catch(() => {
        console.log('注册失败');
      });
  });
}
