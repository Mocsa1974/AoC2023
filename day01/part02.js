const fs = require("fs");
const letters = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9
};

console.log(
  fs
    .readFileSync("./day01/input.txt", "utf-8")
    .split("\n")
    .map((line) => {
      const f_numbers = line.trim().match(
        /1|2|3|4|5|6|7|8|9|one|two|three|four|five|six|seven|eight|nine/g
      );
      const l_numbers = line.trim().split('').reverse().join('').match(
        /1|2|3|4|5|6|7|8|9|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/g
      );
      const first = letters[f_numbers[0]];
      const last = letters[l_numbers[0].split('').reverse().join('')];
      return first.toString()+last.toString();
    })
    .reduce((acc, curr) => {
      return acc + +curr;
    }, 0)
);
