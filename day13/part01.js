const fs = require("fs");
const patterns = fs
  .readFileSync("./day13/input.txt", "utf-8")
  .split("\r\n\r\n")
  .map((m) => {
    return m.split("\r\n").map((m) => m.split(""));
  });
const transform = (pattern) => {
  return pattern[0].map((_, i) => pattern.map((row) => row[i]));
};
const findReflection = (pattern) => {
  let result = -1;
  for (let i = 0; i < pattern.length - 1; i++) {
    if (pattern[i].join("") === pattern[i + 1].join("")) {
      let start = i - 1;
      let end = i + 2;
      let valid = true;
      while (start >= 0 && end <= pattern.length) {
        if (pattern[start] && pattern[end] && pattern[start].join("") !== pattern[end].join("")) {
          valid = false;
          break;
        }
        start--;
        end++
      }
      if (valid) {
        result = i;
        break;
      }
    }
  }
  return result;
};
const transformed_patterns = patterns.map((m) => transform(m));
const result = patterns.map((m, idx) => {
  const col = findReflection(transformed_patterns[idx]);
  if (col !== -1) return col + 1;
  const row = findReflection(m);
  if (row !== -1) return (row + 1) * 100;
});
console.log(
  result.reduce((acc, curr) => {
    return acc + +curr;
  }, 0)
);