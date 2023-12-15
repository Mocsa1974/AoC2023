const fs = require("fs");
let puzzle = fs
  .readFileSync("./day14/input.txt", "utf-8")
  .split("\r\n")
  .map((line) => line.split(""));
let rocks = [];
puzzle
  .map((m, idx) => {
    return m.map((m2, idx2) => {
      return {
        key: m2,
        row: idx,
        col: idx2,
      };
    });
  })
  .map((f) => {
    const found = f.filter((f2) => {
      return f2.key === "O";
    });
    return found.length !== 0 ? found : null;
  })
  .filter((f) => f != null)
  .forEach((f) => {
    f.forEach(f2=> {
      rocks.push({
        row: f2.row,
        col: f2.col,
      });
 
    })
  });
const move_up = () => {
  let canmove = true;
  let steps = 0;
  while (canmove) {
    canmove = false;
    for (let i = 0; i < rocks.length; i++) {
      if (rocks[i].row!==0 && puzzle[rocks[i].row - 1][rocks[i].col] === ".") {
        puzzle[rocks[i].row - 1][rocks[i].col] = "O";
        puzzle[rocks[i].row][rocks[i].col] = ".";
        rocks[i].row--;
        canmove = true;
        steps++;
      }
    }
  }
  return steps === 0 ? false : true;
};
const move_down = () => {
  let canmove = true;
  let steps = 0;
  while (canmove) {
    canmove = false;
    for (let i = 0; i < rocks.length; i++) {
      if (rocks[i].row!==puzzle.length-1 && puzzle[rocks[i].row + 1][rocks[i].col] === ".") {
        puzzle[rocks[i].row + 1][rocks[i].col] = "O";
        puzzle[rocks[i].row][rocks[i].col] = ".";
        rocks[i].row++;
        canmove = true;
        steps++;
      }
    }
  }
  return steps === 0 ? false : true;

};
const move_right = () => {
  let canmove = true;
  let steps = 0;
  while (canmove) {
    canmove = false;
    for (let i = 0; i < rocks.length; i++) {
      if (rocks[i].col!==puzzle[0].length-1 && puzzle[rocks[i].row][rocks[i].col + 1] === ".") {
        puzzle[rocks[i].row][rocks[i].col + 1] = "O";
        puzzle[rocks[i].row][rocks[i].col] = ".";
        rocks[i].col++;
        canmove = true;
        steps++;
      }
    }
  }
  return steps === 0 ? false : true;

};
const move_left = () => {
  let canmove = true;
  let steps = 0;
  while (canmove) {
    canmove = false;
    for (let i = 0; i < rocks.length; i++) {
      if (rocks[i].col!==0 && puzzle[rocks[i].row][rocks[i].col - 1] === ".") {
        puzzle[rocks[i].row][rocks[i].col - 1] = "O";
        puzzle[rocks[i].row][rocks[i].col] = ".";
        rocks[i].col--;
        canmove = true;
        steps++;
      }
    }
  }
  return steps === 0 ? false : true;

};
const get_result = () => {
  return puzzle
    .map((m, idx) => {
      const count = m.filter((f) => f === "O").length;
      return count * (puzzle.length - idx);
    })
    .reduce((acc, curr) => acc + curr, 0);
};
for (let i=0;i<1000;i++) {
  move_up();
  move_left();
  move_down();
  move_right();
  console.log(i,get_result());
}
