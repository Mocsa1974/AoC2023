const fs = require("fs");
const findEmptyRows = () => {
  let result = [];
  map.forEach((m, idx) => {
    if (m.every((e) => e === ".")) {
      result.push(idx);
    }
  });
  return result;
};
const findEmptyCols = () => {
  let result = [];
  let cols = [];
  map.forEach((m, idx) => {
    cols = m.map((_, idx2) => map[idx2][idx]);
    if (cols.every((e) => e === ".")) result.push(idx);
  });
  return result;
};
const numberGalaxies = () => {
  let number = 1;
  let result = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "#") {
        map[i][j] = number.toString();
        result.push({
          number: number.toString(),
          row: i,
          col: j,
        });
        number++;
      }
    }
  }
  return result;
};
const findShortestPaths = () => {
  let result = [];
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      let er = empty_rows.filter(
        (f) =>
          (f > galaxies[i].row && f < galaxies[j].row) ||
          (f > galaxies[j].row && f < galaxies[i].row)
      ).length;
      let ec = empty_cols.filter(
        (f) =>
          (f > galaxies[i].col && f < galaxies[j].col) ||
          (f > galaxies[j].col && f < galaxies[i].col)
      ).length;
      if (er) er = er * 1000000 - er;
      if (ec) ec = ec * 1000000 - ec;
      result.push(
        Math.abs(galaxies[i].row - galaxies[j].row) + er +
          Math.abs(galaxies[i].col - galaxies[j].col) + ec)
    }
  }
  return result;
};
const map = fs
  .readFileSync("./day11/input.txt", "utf-8")
  .split("\r\n")
  .map((line) => {
    return line.split("");
  });
let empty_rows = findEmptyRows();
let empty_cols = findEmptyCols();

const galaxies = numberGalaxies();
console.log(
  findShortestPaths().reduce((acc, curr) => {
    return acc + +curr;
  }, 0)
);
