const hole = [[0, 0]];
let curr_row = 0;
let curr_col = 0;
const fs = require("fs");
fs.readFileSync("./day18/input.txt", "utf-8")
  .split("\r\n")
  .map((m) => {
    let [dir, length, _] = m.split(" ");
    length = +length;
    switch (dir) {
      case "R":
        for (i = 0; i < +length; i++) {
          hole.push([curr_row, curr_col]);
          curr_col += 1;
        }
        break;
      case "D":
        for (i = 0; i < +length; i++) {
          hole.push([curr_row, curr_col]);
          curr_row += 1;
        }
        break;
      case "L":
        for (i = 0; i < +length; i++) {
          hole.push([curr_row, curr_col]);
          curr_col -= 1;
        }
        break;
      case "U":
        for (i = 0; i < +length; i++) {
          hole.push([curr_row, curr_col]);
          curr_row -= 1;
        }
        break;
    }
  });
const pointInPolygon = (polygon, point) => {
  let odd = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; i++) {
    if (
      polygon[i][1] > point[1] !== polygon[j][1] > point[1] &&
      point[0] <
        ((polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1])) /
          (polygon[j][1] - polygon[i][1]) +
          polygon[i][0]
    ) {
      odd = !odd;
    }
    j = i;
  }
  return odd;
};
const tmp = JSON.parse(JSON.stringify(hole));
const heights = tmp.sort((a, b) => {
  return b[0] - a[0];
});
const height_e = heights[0][0];
const height_s = heights[heights.length - 1][0];

const widths = tmp.sort((a, b) => {
  return b[1] - a[1];
});

const width_e = widths[0][1];
const width_s = widths[widths.length - 1][1];
let sum = 0;
for (let i = height_s; i <= height_e; i++) {
  for (let j = width_s; j <= width_e; j++) {
    const f = hole.filter((f) => f[0] === i && f[1] === j);

    if (pointInPolygon(hole, [i, j]) || f.length !== 0) {
      sum++;
    }
  }
}
console.log(sum);
