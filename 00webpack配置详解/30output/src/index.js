// import add from "./add";
import count from "./count";

// console.log(add(2, 3));
console.log(count(2, 3));

import("./add").then(({ default: add }) => {
  console.log(add(3, 3));
});
