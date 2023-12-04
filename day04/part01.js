const fs = require("fs");
const cards = fs
  .readFileSync("./day04/input.txt", "utf-8")
  .split("\r\n")
  .map((line) => {
    const [cardnumber, cardvalue] = line.split(": ");
    const [winning, mycards] = cardvalue.split(" | ");
    winning_array = winning.split(" ");
    mycard_array = mycards.split(" ").filter((f) => +f);
    const found = mycard_array.filter((f) => winning_array.includes(f)).length;
    return !found ? 0 : found === 1 ? 1 : Math.pow(2, found - 1);
  })
  .reduce((acc, curr) => {
    return acc + +curr;
  }, 0);
console.log(cards);
