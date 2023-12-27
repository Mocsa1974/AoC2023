let result = [];
let sums = [];
const check = (rating) => {
  let sum = 1;
  for (let i = 0; i < 16; i++) {
    const bin = i.toString(2).padStart(4, "0");
    let key = "in";
    while (key !== "A" && key !== "R") {
      let eval_str = "";
      sums = [];
      workflows[key].forEach((f) => {
        if (f.indexOf(">") !== -1 || f.indexOf("<") !== -1) {
          let [cond, goto] = f.split(":");
          if (cond.indexOf("x") !== -1) {
            const f_num = rating.filter((f) => f.indexOf("x=") !== -1);
            const num = +f_num[0].split("=")[1];
            if (bin[0] === "0") sums.push(num - 1);
            else sums.push(num + 1);
            cond = bin[0] === "0" ? "false" : "true";
          }
          if (cond.indexOf("m") !== -1) {
            const f_num = rating.filter((f) => f.indexOf("m=") !== -1);
            const num = +f_num[0].split("=")[1];
            if (bin[1] === "0") sums.push(num - 1);
            else sums.push(num + 1);
            cond = bin[1] === "0" ? "false" : "true";
          }
          if (cond.indexOf("a") !== -1) {
            const f_num = rating.filter((f) => f.indexOf("a=") !== -1);
            const num = +f_num[0].split("=")[1];
            if (bin[2] === "0") sums.push(num - 1);
            else sums.push(num + 1);
            cond = bin[2] === "0" ? "false" : "true";
          }
          if (cond.indexOf("s") !== -1) {
            const f_num = rating.filter((f) => f.indexOf("s=") !== -1);
            const num = +f_num[0].split("=")[1];
            if (bin[3] === "0") sums.push(num - 1);
            else sums.push(num + 1);
            cond = bin[3] === "0" ? "false" : "true";
          }

          eval_str += ":" + cond + "?" + "'" + goto + "'";
        } else eval_str += ":" + "'" + f + "'";
      });
      eval_str = eval_str.substring(1);
      key = eval(eval_str);
    }
    if (key === "A") {
      result.push(
        rating.reduce((acc, curr) => {
          const [variable, value] = curr.split("=");
          return acc + (+value + sums.reduce((acc,curr)=>acc * curr,0));
        }, 0)
      );
    }
  }
};
const fs = require("fs");
const [w, r] = fs
  .readFileSync("./day19/example.txt", "utf-8")
  .split("\r\n\r\n");
workflows = {};
ratings = [];
w.split("\r\n").forEach((workflow) => {
  [_name, value] = workflow.split("{");
  workflows[_name] = value.replace("}", "").split(",");
});
r.split("\r\n").forEach((rating) => {
  ratings.push(rating.replace(/[{}]/g, "").split(","));
});

ratings
  .map((m) => {
    return check(m);
  })
  .reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  console.log(result);
console.log(
  result.reduce((acc, curr) => {
    return acc + curr;
  }, 1)
);
