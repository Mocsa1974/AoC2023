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
const findReflection = (pattern, orig) => {
  let result = -1;
  for (let i = 0; i < pattern.length - 1; i++) {
    if (pattern[i].join("") === pattern[i + 1].join("")) {
      let start = i - 1;
      let end = i + 2;
      let valid = true;
      while (start >= 0 && end < pattern.length) {
        if (pattern[start].join("") !== pattern[end].join("")) {
          valid = false;
          break;
        }
        start--;
        end++;
      }
      if (valid && i !== orig) {
        result = i;
        return result;
      }
    }
  }
  return result;
};

let result = [];
let found_new = false;
for (let i = 0; i < patterns.length; i++) {
  let trans = transform(patterns[i]);
  origcol = findReflection(trans);
  if (origcol === -1) origrow = findReflection(patterns[i]);
  else origrow = -1;
  found_new = false;

  for (let j = 0; j < trans.length; j++) {
    if (found_new) break;
    for (let k = 0; k < trans[j].length; k++) {
      let curr = JSON.parse(JSON.stringify(trans));
      if (curr[j][k] === ".") curr[j][k] = "#";
      else curr[j][k] = ".";
      let c = findReflection(curr, origcol);
      if (c !== -1 && c !== origcol) {
        result.push(c + 1);
        found_new = true;
        break;
      }
    }
    if (!found_new) {
      for (let j = 0; j < patterns[i].length; j++) {
        if (found_new) break;
        for (let k = 0; k < patterns[i][j].length; k++) {
          let curr = JSON.parse(JSON.stringify(patterns[i]));
          if (curr[j][k] === ".") curr[j][k] = "#";
          else curr[j][k] = ".";
          let r = findReflection(curr,origrow);
          if (r !== -1 && r !== origrow) {
            result.push((r + 1) * 100);
            found_new = true;
            break;
          }
        }
      }
    }
  }
}
console.log(
  result.reduce((acc, curr) => {
    return acc + +curr;
  }, 0)
);
