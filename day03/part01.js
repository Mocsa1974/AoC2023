const fs = require("fs");
const isValid = (num) => {
  for (i = num.start - 1; i <= num.end + 1; i++) {
    if (engine[num.row][i] && engine[num.row][i] && engine[num.row][i].symbol) {
      return true;
    }
    if (
      engine[num.row - 1] &&
      engine[num.row - 1][i] &&
      engine[num.row - 1][i].symbol
    ) {
      return true;
    }
    if (
      engine[num.row + 1] &&
      engine[num.row + 1][i] &&
      engine[num.row + 1][i].symbol
    ) {
      return true;
    }
  }
};
const findNumbers = () => {
  let result = [];
  for (let i = 0; i < engine.length; i++) {
    let n = "";
    let start = -1;
    let end = -1;
    for (let j = 0; j < engine[i].length; j++) {
      if (engine[i][j].number) {
        n += engine[i][j].value;
        if (start === -1) {
          start = j;
          end = -1;
        }
      } else {
        if (!engine[i][j].number && start !== -1) {
          end = j - 1;
          result.push({
            number: n,
            start: start,
            end: end,
            row: i,
          });
          n = "";
          start = -1;
          end = -1;
        }
      }
    }
    if (start !== -1 && end === -1) {
      end = engine[0].length;
      result.push({
        number: n,
        start: start,
        end: end,
        row: i,
      });
    }
  }
  return result;
};
const engine = fs
  .readFileSync("./day03/input.txt", "utf-8")
  .split("\r\n")
  .map((line) => {
    return line.split("").map((char) => {
      return {
        number: !isNaN(+char),
        value: +char,
        symbol: isNaN(+char) && char !== ".",
        period: char === ".",
      };
    });
  });
const numbers = findNumbers();
const result = [];
for (k = 0; k < numbers.length; k++) {
  if (isValid(numbers[k])) {
    result.push(+numbers[k].number);
  }
}
console.log(
  result.reduce((acc, curr) => {
    return acc + +curr;
  }, 0)
);
console.log("");
