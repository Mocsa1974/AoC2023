const fs = require("fs");
const parseInput = () => {
  let seeds,
    seed_to_soil,
    soil_to_fertilizer,
    fertilizer_to_water,
    water_to_light,
    light_to_temperature,
    temperature_to_humidity,
    humidity_to_location;
  let maps = [];

  fs.readFileSync("./day05/input.txt", "utf-8")
    .split("\r\n\r\n")
    .map((section) => {
      const [type, data] = section.split(":");
      switch (type) {
        case "seeds":
          seeds = data.split(" ").filter((f) => f !== "");
          break;
        case "seed-to-soil map":
          seed_to_soil = data.split("\r\n").filter((f) => f !== "");
          maps.push(seed_to_soil);
          break;
        case "soil-to-fertilizer map":
          soil_to_fertilizer = data.split("\r\n").filter((f) => f !== "");
          maps.push(soil_to_fertilizer);
          break;
        case "fertilizer-to-water map":
          fertilizer_to_water = data.split("\r\n").filter((f) => f !== "");
          maps.push(fertilizer_to_water);
          break;
        case "water-to-light map":
          water_to_light = data.split("\r\n").filter((f) => f !== "");
          maps.push(water_to_light);
          break;
        case "light-to-temperature map":
          light_to_temperature = data.split("\r\n").filter((f) => f !== "");
          maps.push(light_to_temperature);
          break;
        case "temperature-to-humidity map":
          temperature_to_humidity = data.split("\r\n").filter((f) => f !== "");
          maps.push(temperature_to_humidity);
          break;
        case "humidity-to-location map":
          humidity_to_location = data.split("\r\n").filter((f) => f !== "");
          maps.push(humidity_to_location);
          break;
      }
    });
  return [seeds, maps];
};
const [seeds, maps] = parseInput();
const result = seeds.map((seed) => {
  let current = seed;
  for (let map of maps) {
    const validmap = map.filter((f) => {
      const [dest, source, length] = f.split(" ");
      return +current >= +source && current <= +source + (+length - 1);
    });
    if (validmap.length === 1) {
      const [dest, source, length] = validmap[0].split(" ");
      current = +current - +source + +dest;
    }
  }
  return current;
});
console.log(
  result
    .map((m) => +m)
    .sort((a, b) => {
      return a == b ? 0 : a > b ? 1 : -1;
    })[0]
);
