// import "@babel/polyfill";

const add = (x, y) => {
  return x + y;
};

console.log(add(23, 3));

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log("log 1");
    resolve();
  }, 1000);
});
console.log(promise);
