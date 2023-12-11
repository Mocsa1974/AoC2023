const fs = require("fs");
const lines = fs.readFileSync("./day08/input.txt", "utf-8").split("\r\n\r\n");
const directions = lines[0];
let direction_index = 0;
let steps = 0;
let map = {};
lines[1].split("\r\n").map((m) => {
  const [key, value] = m.trim().split("=");
  const paths = value.replace(/[()]/g, "").split(",");
  map[key.trim()] = {
    left: paths[0].trim(),
    right: paths[1].trim(),
  };
});
let key = "AAA";

while (key !== "ZZZ") {
  if (directions[direction_index] === "R") {
    key = map[key].right;
  }
  if (directions[direction_index] === "L") {
    key = map[key].left;
  }
  direction_index++;
  steps++;
  if (direction_index === directions.length) direction_index = 0;
}
console.log(steps);
