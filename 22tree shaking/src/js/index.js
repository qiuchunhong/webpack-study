import '../css/index.css';

import { mul } from './test';

function sun(...args) {
  return args.reduce((p, c) => p + c, 0);
}

console.log(sun(1, 2, 3, 4, 5));

console.log(mul(3, 4));
