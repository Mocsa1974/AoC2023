let beams = [];
const fs = require("fs");
const map = fs
  .readFileSync("./day16/input.txt", "utf-8")
  .split("\r\n")
  .map((m) => {
    return m.split("").map((_m) => {
      return {
        char: _m,
        visited: false,
      };
    });
  });
beams.push({
  row: 0,
  col: 0,
  dir: "D",
  destroyed: false,
});
map[0][0].visited = true;
map[0][0].from = "D";
const move = (beam) => {
  switch (beam.dir) {
    case "U":
      beam.row--;
      break;
    case "D":
      beam.row++;
      break;
    case "L":
      beam.col--;
      break;
    case "R":
      beam.col++;
      break;
  }
  if (map[beam.row][beam.col].visited && map[beam.row][beam.col].from === beam.dir) {
    beam.destroyed = true;
    return;
  }
  map[beam.row][beam.col].visited = true;
  map[beam.row][beam.col].from  = beam.dir;

  switch (map[beam.row][beam.col].char) {
    case "|":
        if (beam.dir  === 'R' || beam.dir === 'L') {
          beam.dir = "U";
          beams.push({
            row: beam.row,
            col: beam.col,
            dir: "D",
          });
        }
      break;
    case "-":
      if (beam.dir  === 'U' || beam.dir === 'D') {
        beam.dir = "R";
          beams.push({
            row: beam.row,
            col: beam.col,
            dir: "L",
          });
        }
      break;
    case "\\":
      if (beam.dir === "D") {
        beam.dir = "R";
      } else {
        if (beam.dir === "U") {
          beam.dir = "L";
        } else {
          if (beam.dir === "L") {
            beam.dir = "U";
          } else {
            if (beam.dir === "R") {
              beam.dir = "D";
            }
          }
        }
      }
      break;
    case "/":
      if (beam.dir === "U") {
        beam.dir = "R";
      } else {
        if (beam.dir === "D") {
            beam.dir = "L";
          } else {
            if (beam.dir === "L") {
                beam.dir = "D";
              } else {
                if (beam.dir === "R") {
                    beam.dir = "U";
                  }
              }
          }
      }
      break;
  }
};
const can_move = (beam) => {
  if (beam.dir === "R" && beam.col === map[0].length - 1) return false;
  if (beam.dir === "L" && beam.col === 0) return false;
  if (beam.dir === "U" && beam.row === 0) return false;
  if (beam.dir === "D" && beam.row === map.length - 1) return false;
  return true;
};
while (beams.some((s) => !s.destroyed)) {
  for (let i = 0; i < beams.length; i++) {
    if (beams[i].destroyed) continue;
    if (!can_move(beams[i])) {
      beams[i].destroyed = true;
    } else {
      move(beams[i]);
    }
  }
}
console.log(map.reduce((acc,curr) => {
   return acc + (curr.filter(f=>f.visited).length);
},0));