const hole = [[0, 0]];
let curr_row = 0;
let curr_col = 0;
const fs = require("fs");
fs.readFileSync("./day18/input.txt", "utf-8")
  .split("\r\n")
  .map((m) => {
    let [dir, length, color] = m.split(" ");
         color = color.replace(/[(#)]/g,"");
     dir = +color[color.length-1];
    if (dir === 0) dir = 'R';
    else if (dir === 1) dir ='D';
    else if (dir === 2) dir = 'L';
    else if (dir === 3) dir = 'U';
     length = Number('0x'+color.substring(0,5));
    length = +length;
    console.log(dir + " " + length);
    switch (dir) {
      case "R":
        curr_col += length;
        hole.push([curr_row, curr_col]);
        break;
      case "D":
        curr_row += length;
        hole.push([curr_row, curr_col]);
        break;
      case "L":
        curr_col -= length;
        hole.push([curr_row, curr_col]);
        break;
      case "U":
        curr_row -= length;
        hole.push([curr_row, curr_col]);
        break;
    }
  });
const shoelace = (polygon) => {
    let length = polygon.length;
    let sum1 = 0;
    let sum2 = 0;
    
    for (let i=0;i<length-1;i++) {
        sum1+= polygon[i][0] * polygon[i+1][1];
        sum2+= polygon[i][1] * polygon[i+1][0];
    }
    
    sum1 += polygon[length-1][0]*polygon[0][1];
    sum2 += polygon[length-1][1]*polygon[0][0];
    return Math.abs(sum1 - sum2) / 2;
};
const plus = hole.reduce((acc,curr,idx,arr) => {
    if (idx === 0) return 0;
    return acc + Math.abs(curr[0] - arr[idx-1][0]) + Math.abs(curr[1] - arr[idx-1][1]);
},0);
console.log(shoelace(hole)+(plus /2)+1);
