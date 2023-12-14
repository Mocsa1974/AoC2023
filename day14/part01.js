const fs = require("fs");
const puzzle = fs
  .readFileSync("./day14/input.txt", "utf-8")
  .split("\r\n")
  .map((line) => line.split(""));
let canmove = true;
while (canmove) {
  canmove = false;
  for (let i = puzzle.length - 1; i > 0; i--) {
    for (let j = 0; j < puzzle[i].length; j++) {
      if (puzzle[i][j] === "O" && puzzle[i - 1][j] === ".") {
        puzzle[i - 1][j] = "O";
        puzzle[i][j] = ".";
        canmove = true;
      }
    }
  }
}
console.log(
  puzzle
    .map((m, idx) => {
      const count = m.filter((f) => f === "O").length;
      return count * (puzzle.length - idx);
    })
    .reduce((acc, curr) => acc + curr, 0)
);
