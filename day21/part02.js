const fs = require("fs");

const garden = fs.readFileSync("./day21/example.txt", "utf-8").split("\r\n");
const garden_map = {};
let copies = 0;
garden.forEach((f, idx) => {
  f.split("").forEach((f2, idx2) => {
    garden_map[idx + "_" + idx2] = f2;
  });
});
const positions = [];
const find_start_position = () => {
  const pos = Object.entries(garden_map).find(([key, value]) => {
    if (value === "S") return key;
  });
  return {
    row: +pos[0].split("_")[0],
    col: +pos[0].split("_")[1],
  };
};
const get_dimensions = () => {
    const bound = {}
    const sorted_h = Object.keys(garden_map).sort((a,b) => {
        return +a.split('_')[0] === +b.split('_')[0] ? 0 : +a.split('_')[0] > +b.split('_')[0] ? 1 :-1;
    });
    bound.top = +sorted_h[0].split('_')[0];
    bound.bottom = +sorted_h[sorted_h.length-1].split('_')[0];
    const sorted_w = Object.keys(garden_map).sort((a,b) => {
        return +a.split('_')[1] > +b.split('_')[1] === 0 ? 0 :+a.split('_')[1] > +b.split('_')[1] ? 1 : -1;
    });
    bound.left = +sorted_w[0].split('_')[1];
    bound.right = +sorted_w[sorted_w.length-1].split('_')[1];
    return bound;
}
const expand_map = (dir) => {
    const bound = get_dimensions();
  switch (dir) {
    case "U":
        garden.forEach((f, idx) => {
            f.split("").forEach((f2, idx2) => {
              garden_map[((bound.top-garden.length + idx)).toString() + "_" + idx2.toString()] = f2;
            });
          });
          
      break;
    case "D":
        garden.forEach((f, idx) => {
            f.split("").forEach((f2, idx2) => {
              garden_map[(bound.bottom+idx+1).toString() + "_" + idx2.toString()] = f2;
            });
          });
      break;
    case "L":
        garden.forEach((f, idx) => {
            f.split("").forEach((f2, idx2) => {
              garden_map[idx.toString() + "_" + (bound.left-garden[0].length +idx2).toString()] = f2;
            });
          });

      break;
    case "R":
        garden.forEach((f, idx) => {
            f.split("").forEach((f2, idx2) => {
              garden_map[idx.toString() + "_" + (bound.right+idx2+1).toString()] = f2;
            });
          });
      break;
  }
};
const find_available_positions = (position) => {
  if (!garden_map[(position.row - 1).toString() + "_" + (position.col).toString()]) {
    copies++;
//    expand_map('U');
  }
  if (!garden_map[(position.row + 1).toString() + "_" + (position.col).toString()]) {
    copies++;
//    expand_map('D');
  }
  if (!garden_map[(position.row).toString() + "_" + (position.col + 1).toString()]) {
    copies++;

//    expand_map('R');
  }
  if (!garden_map[(position.row).toString() + "_" + (position.col - 1).toString()]) {
    copies++;

//    expand_map('L');
  }
  let new_pos = [];
  if (garden_map[(position.row - 1).toString() + "_" + (position.col).toString()] === ".") {
    new_pos.push({
      row: position.row - 1,
      col: position.col,
    });
  }
  if (garden_map[(position.row + 1).toString() + "_" + (position.col).toString()] === ".") {
    new_pos.push({
      row: position.row + 1,
      col: position.col,
    });
  }
  if (garden_map[(position.row).toString() + "_" + (position.col + 1).toString()] === ".") {
    new_pos.push({
      row: position.row,
      col: position.col + 1,
    });
  }
  if (garden_map[(position.row).toString() + "_" + (position.col - 1).toString()] === ".") {
    new_pos.push({
      row: position.row,
      col: position.col - 1,
    });
  }
  return new_pos;
};
const step = (pos) => {
  const new_positions = find_available_positions(pos);
  for (let pos of new_positions) {
    garden_map[pos.row + "_" + pos.col] = "O";
  }
  garden_map[pos.row + "_" + pos.col] = ".";
};
const get_positons = () => {
  let result = [];
  Object.entries(garden_map).forEach(([key, value]) => {
    if (value === "O")
      result.push({
        row: +key.split("_")[0],
        col: +key.split("_")[1],
      });
  });
  return result;
};
const cal_result = () => {
  let result = 0;
  Object.entries(garden_map).forEach(([key, value]) => {
    if (value === "O") result++;
  });
  return result;
};
const s = find_start_position();
positions.push(s);
garden_map[s.row + "_" + s.col] = "O";
for (let i = 0; i < 10; i++) {
  const current_pos = get_positons();
  for (let pos of current_pos) step(pos);
}
console.log(cal_result());
