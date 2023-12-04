const fs = require("fs");
console.log(
  fs
    .readFileSync("./day02/input.txt", "utf-8")
    .split("\r\n")
    .map((line, idx) => {
      let red = 0;
      green = 0;
      blue = 0;

      const [_, game_data] = line.replace(/\s/g, "").split(":");
      const sections = game_data.split(";");
      console.log(game_data);
      for (const section of sections) {
        const rgbs = section.split(",");
        red = 0;
        green = 0;
        blue = 0;
        for (const value of rgbs) {
          if (value.indexOf("red") !== -1) red += +parseInt(value);
          if (value.indexOf("blue") !== -1) blue += +parseInt(value);
          if (value.indexOf("green") !== -1) green += +parseInt(value);
        }
        if (red > 12 || green > 13 || blue > 14) return 0;
      }
      return idx + 1;
    })
    .reduce((acc, curr) => {
      return acc + +curr;
    }, 0)
);
