const fs = require("fs");
const get_hash = (str) => {
  return str.split("").reduce((acc, curr) => {
    return ((acc + curr.charCodeAt(0)) * 17) % 256;
  }, 0);
};
let boxes = {};
let label = "";
let focal = 0;
let hash = 0;
const input_values = fs.readFileSync("./day15/input.txt", "utf-8").split(",");
for (let value of input_values) {
  const operation = value.match(/[-=]/g);
  switch (operation[0]) {
    case "-":
      [label, _] = value.split("-");
      hash = get_hash(label);

      const idx = boxes[hash]
        ? boxes[hash].findIndex((f) => f.label === label)
        : -1;
      if (idx !== -1) {
        boxes[hash].splice(idx, 1);
      }
      break;
    case "=":
      [label, focal] = value.split("=");
      hash = get_hash(label);

      if (
        !boxes[hash] ||
        boxes[hash].filter((f) => f.label === label).length === 0
      ) {
        if (!boxes[hash]) boxes[hash] = [];
        boxes[hash].push({
          label: label,
          box: hash,
          focal: +focal,
        });
      } else {
        const idx = boxes[hash].findIndex((f) => f.label === label);
        if (idx !== -1) {
          boxes[hash][idx] = {
            label: label,
            box: hash,
            focal: +focal,
          };
        }
      }
      break;
    default:
      console.log("default", value);
  }
}

console.log(
  Object.values(boxes).reduce((a, c) => {
    return (
      a +
      c.reduce((acc, curr, idx) => {
        return acc + (curr.box + 1) * (idx + 1) * curr.focal;
      }, 0)
    );
  }, 0)
);
