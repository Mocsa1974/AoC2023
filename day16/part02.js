let beams = [];
const fs = require("fs");
let map = fs
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
let origmap = JSON.parse(JSON.stringify(map));
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
let max = 0;
for (let ii=0;ii<map[0].length;ii++) {
    map = JSON.parse(JSON.stringify(origmap));
    beams = [];
    beams.push({
        row: 0,
        col: ii,
        dir:'D',
        destroyed: false,
      });
      map[0][ii].visited = true;
      map[0][ii].from = 'D';
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
      const m = map.reduce((acc,curr) => {
        return acc + (curr.filter(f=>f.visited).length);
     },0);      
     if (m>max) max =m;
}
for (let ii=0;ii<map[0].length;ii++) {
    map = JSON.parse(JSON.stringify(origmap));
    beams = [];
    beams.push({
        row: map.length-1,
        col: ii,
        dir:'U',
        destroyed: false,
      });
      map[0][ii].visited = true;
      map[0][ii].from = 'U';
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
      const m = map.reduce((acc,curr) => {
        return acc + (curr.filter(f=>f.visited).length);
     },0);      
     if (m>max) max =m;
}
for (let ii=0;ii<map.length;ii++) {
    map = JSON.parse(JSON.stringify(origmap));
    beams = [];
    beams.push({
        row: ii,
        col: 0,
        dir:'R',
        destroyed: false,
      });
      map[0][ii].visited = true;
      map[0][ii].from = 'R';
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
      const m = map.reduce((acc,curr) => {
        return acc + (curr.filter(f=>f.visited).length);
     },0);      
     if (m>max) max =m;
}
for (let ii=0;ii<map.length;ii++) {
    map = JSON.parse(JSON.stringify(origmap));
    beams = [];
    beams.push({
        row: ii,
        col: map.length-1,
        dir:'L',
        destroyed: false,
      });
      map[0][ii].visited = true;
      map[0][ii].from = 'U';
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
      const m = map.reduce((acc,curr) => {
        return acc + (curr.filter(f=>f.visited).length);
     },0);      
     if (m>max) max =m;
}
console.log(max);
