import "../css/index.css";

function sun(...args) {
  return args.reduce((p, c) => p + c, 0);
}

console.log(sun(1, 2, 3, 4, 5));
