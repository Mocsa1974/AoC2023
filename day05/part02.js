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
  let intervals = [];
  fs.readFileSync("./day05/input.txt", "utf-8")
    .split("\r\n\r\n")
    .map((section) => {
      const [type, data] = section.split(":");
      switch (type) {
        case "seeds":
          seeds = data.split(" ").filter((f) => f !== "");
          for (let i = 0; i < seeds.length - 1; i += 2) {
            intervals.push({
              interval: [+seeds[i], +seeds[i] + +seeds[i + 1] - 1],
              transformed: false,
            });
          }
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
  return [intervals, maps];
};
let [intervals, maps] = parseInput();
const transform = (value, source, destination) => {
  return [
    +value[0] - +source[0] + +destination[0],
    +value[1] - +source[0] + +destination[0],
  ];
};
const extractMap = (map) => {
  const [destination, source, length] = map.split(" ");
  return [
    [+source, +source + +length - 1],
    [+destination, +destination + +length - 1],
  ];
};
for (let map of maps) {
  intervals = intervals.map((m) => {
    return {
      interval: [...m.interval],
      transformed: false,
    };
  });

  for (let i = 0; i < intervals.length; i++) {
    for (let current_map of map) {
      if (intervals[i].transformed) continue;
      const [source, destination] = extractMap(current_map);
      if (
        intervals[i].interval[0] < source[0] &&
        intervals[i].interval[1] >= source[0] &&
        intervals[i].interval[1] <= source[1]
      ) {
        //átfedés előlről
        intervals.push({
          interval: [intervals[i].interval[0], source[0] - 1],
          transformed: false,
        });
        intervals[i].interval = transform(
          [source[0], intervals[i].interval[1]],
          source,
          destination
        );
        intervals[i].transformed = true;
      } else {
        if (
          intervals[i].interval[0] >= source[0] &&
          intervals[i].interval[0] <= source[1] &&
          intervals[i].interval[1] >= source[0] &&
          intervals[i].interval[1] <= source[1]
        ) {
          //teljesen benne van
          intervals[i].interval = transform(
            [intervals[i].interval[0], intervals[i].interval[1]],
            source,
            destination
          );
          intervals[i].transformed = true;
        } else {
          if (
            intervals[i].interval[0] >= source[0] &&
            intervals[i].interval[1] <= source[1] &&
            intervals[i].interval[1] > source[1]
          ) {
            //átfedés hátulról
            intervals[i].interval = transform(
              [intervals[i].interval[0], source[1]],
              source,
              destination
            );
            intervals[i].transformed = true;
            intervals.push({
              interval: [source[1] + 1, intervals[i].interval[1]],
              transformed: false,
            });
          } else {
            if (
              intervals[i].interval[0] < source[0] &&
              intervals[i].interval[1] > source[1]
            ) {
              //körbezárás
              intervals.push({
                interval: [intervals[i].interval[0], source[0] - 1],
                transformed: false,
              });
              intervals.push({
                interval: [source[1] + 1, intervals[i].interval[1]],
                transformed: false,
              });
              intervals[i].interval = transform(
                [source[0], source[1]],
                source,
                destination
              );
              intervals[i].transformed = true;
            } else {
              //nincs benne
            }
          }
        }
      }
    }
  }
}
console.log(
  intervals
    .map((m) => +m.interval[0])
    .sort((a, b) => {
      return a == b ? 0 : a > b ? 1 : -1;
    })[0]
);
