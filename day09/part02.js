const fs = require("fs");
const result = fs
  .readFileSync("./day09/input.txt", "utf-8")
  .split("\r\n")
  .map((line) => {
    const numbers = new Array(line.split(" "));
    while (!numbers[numbers.length - 1].every((e) => +e === 0)) {
      let new_elem = [];
      for (let i = 0; i < numbers[numbers.length - 1].length - 1; i++) {
        new_elem.push(
          numbers[numbers.length - 1][i + 1] - numbers[numbers.length - 1][i]
        );
      }
      numbers.push(new_elem);
    }
    let add = 0;
    numbers[numbers.length - 1].unshift(add);
    for (let i = numbers.length - 2; i >= 0; i--) {
      numbers[i].unshift(numbers[i][0] - add);
      add = numbers[i][0];
    }
    return add;
  });
console.log(
  result.reduce((acc, curr) => {
    return acc + curr;
  }, 0)
);
