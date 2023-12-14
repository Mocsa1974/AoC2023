const fs = require('fs');
const map = fs
  .readFileSync("./day10/input.txt", "utf-8")
  .split("\r\n")
  .map((m) => m.split(""));
const directions = {
  "|": ["U", "D"],
  "-": ["R", "L"],
  L: ["U", "R"],
  J: ["U", "L"],
  7: ["D", "L"],
  F: ["D", "R"],
};
const pointInPolygon = (polygon, point) => {
    let odd = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; i++) {
        if (((polygon[i][1] > point[1]) !== (polygon[j][1] > point[1])) 
            && (point[0] < ((polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0]))) {
            odd = !odd;
        }
        j = i;
    }
    return odd;
};
const findStartPosition = () => {
  let r_idx = 0,
    c_idx = 0;
  for (let row of map) {
    c_idx = 0;
    for (let col of row) {
      if (col === "S") {
        return {
          row: r_idx,
          col: c_idx,
        };
      }
      c_idx++;
    }
    r_idx++;
  }
};
const startPosition = findStartPosition();
const currentPosition = {
  row: startPosition.row,
  col: startPosition.col,
};
const move = (_from) => {
  const next_move = directions[
    map[currentPosition.row][currentPosition.col]
  ].filter((f) => f !== _from)[0];
  switch (next_move) {
    case "U":
      currentPosition.row--;
      from = "D";
      break;
    case "D":
      currentPosition.row++;
      from = "U";
      break;
    case "L":
      currentPosition.col--;
      from = "R";

      break;
    case "R":
      currentPosition.col++;
      from = "L";
      break;
  }
};
let steps = 0;
map[startPosition.row][startPosition.col] = "|";
currentPosition.row++;
let from = "U";
move(from);
steps++;
while (
  !(
    currentPosition.row === startPosition.row &&
    currentPosition.col === startPosition.col
  )
) {
  move(from);
  steps++;
}
console.log((steps + 1) / 2);
