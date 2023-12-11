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
    let sum = 0;
    for (let i = numbers.length - 2; i >= 0; i--) {
      sum += +numbers[i][numbers[i].length - 1];
    }
    return sum;
  });
console.log(
  result.reduce((acc, curr) => {
    return acc + curr;
  }, 0)
);
