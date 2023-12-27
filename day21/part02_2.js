const fs = require("fs");
const garden = fs
  .readFileSync("./day21/example.txt", "utf-8")
  .split("\r\n")
  .map((m) => m.split(""));
const positions = [];
let copies = 1;
const find_start_position = () => {
  for (let row in garden) {
    for (let col in garden[+row]) {
      if (garden[+row][+col] === "S")
        return {
          row: +row,
          col: +col,
        };
    }
  }
  return {
    row: -1,
    col: -1,
  };
};
const find_available_positions = (position) => {
  let new_pos = [];
  if (position.row > 0 && garden[position.row - 1][position.col] === ".") {
    new_pos.push({
      row: position.row - 1,
      col: position.col,
    });
  } else {
    if (position.row === 0 && garden[garden.length - 1][position.col] === ".") {
      new_pos.push({
        row: garden.length - 1,
        col: position.col,
      });
      console.log('exit');
    }
  }
  if (position.row < garden.length - 1 && garden[position.row + 1][position.col] === ".") {
    new_pos.push({
      row: position.row + 1,
      col: position.col,
    });
  } else {
    if (position.row === garden.length - 1 && garden[0][position.col] === ".") {
    new_pos.push({
      row: 0,
      col: position.col,
    });
    console.log('exit');

}
  }
  if (position.col < garden[0].length - 1 && garden[position.row][position.col + 1] === ".") {
    new_pos.push({
      row: position.row,
      col: position.col + 1,
    });
  } else {
    if (position.col === garden[0].length - 1 && garden[position.row][0] === ".") {
    new_pos.push({
      row: position.row,
      col: 0,
    });
    console.log('exit');

}
  }
  if (position.col > 0 && garden[position.row][position.col - 1] === ".") {
    new_pos.push({
      row: position.row,
      col: position.col - 1,
    });
  } else {
    if (position.col === 0 && garden[position.row][garden[0].length - 1] === ".") {
    new_pos.push({
      row: position.row,
      col: garden[0].length - 1,
    });
    console.log('exit');

}
  }
  return new_pos;
};
const step = (pos) => {
  const new_positions = find_available_positions(pos);
  for (let pos of new_positions) {
    garden[pos.row][pos.col] = "O";
  }
  garden[pos.row][pos.col] = ".";
};
const get_positons = () => {
  let result = [];
  for (let row in garden) {
    for (let col in garden[+row]) {
      if (garden[+row][+col] === "O")
        result.push({
          row: +row,
          col: +col,
        });
    }
  }
  return result;
};
const cal_result = () => {
  let result = 0;
  for (let row in garden) {
    for (let col in garden[+row]) {
      if (garden[+row][+col] === "O") result++;
    }
  }
  return result;
};
const s = find_start_position();
positions.push(s);
garden[s.row][s.col] = "O";
for (let i = 0; i < 50; i++) {
  const current_pos = get_positons();
  for (let pos of current_pos) step(pos);
  console.log(copies,cal_result());
}


