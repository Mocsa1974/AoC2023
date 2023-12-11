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
let keys = [];
Object.entries(map).forEach(([k, v]) => {
  if (k[k.length - 1] === "A") keys.push(k);
});
/* keys = keys.sort((a, b) => {
    return a > b ? 1 : -1;
});*/
numbers = [];
let key;
function smallestCommons(arr) {
  var gcm = arr.reduce(function (a, b) {
    let minNum = Math.min(a, b);
    let maxNum = Math.max(a, b);
    var placeHolder = 0;

    while (minNum !== 0) {
      placeHolder = maxNum;
      maxNum = minNum;
      minNum = placeHolder % minNum;
    }

    return (a * b) / minNum;
  }, 1);

  return gcm;
}
for (let k of keys) {
  steps = 0;
  direction_index = 0;
  key = k;
  while (key[key.length - 1] !== "Z") {
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
  numbers.push(steps);
}
const hcf = (a, b) => {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};
const lcm = (numbers) => {
  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    result = (result * numbers[i]) / hcf(result, numbers[i]);
  }

  return result;
};

console.log(lcm(numbers));
