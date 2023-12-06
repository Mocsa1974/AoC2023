const fs = require("fs");
const races = [];
const lines = fs.readFileSync("./day06/input.txt", "utf-8").split("\r\n");

const times = lines[0].match(/Time:|\s*\d+/g).map((m) => +m.trim());
times.shift();
const dists = lines[1].match(/Distance:|\s*\d+/g).map((m) => +m.trim());
dists.shift();
races.push({
  time: +times.join(""),
  distance: dists.join(""),
  ways: [],
  valid: 0,
});
for (let race of races) {
  for (let i = 0; i < race.time; i++) race.ways.push(i * (race.time - i));
  race.valid = race.ways.filter((f) => f > race.distance).length;
}
console.log(
  races.reduce((acc, curr) => {
    return acc * curr.valid;
  }, 1)
);
