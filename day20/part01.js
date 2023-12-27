const fs = require("fs");
const modules = {};
const lines = fs.readFileSync("./day20/input.txt", "utf-8").split("\r\n");
lines.forEach((line) => {
  const [_name, _modules] = line.split(" -> ");
  if (_name === "broadcaster") {
    modules[_name] = {
      destinations: _modules.split(", "),
      type: "broadcaster",
      name: "broadcaster",
    };
  } else {
    if (_name.substring(0, 1) === "%") {
      modules[_name.substring(1)] = {
        destinations: _modules.split(", "),
        state: "off",
        type: "flipflop",
        name: _name.substring(1),
      };
    } else {
      modules[_name.substring(1)] = {
        destinations: _modules.split(", "),
        inputs: [],
        type: "conjuction",
        name: _name.substring(1),
      };
    }
  }
});
Object.values(modules).forEach((value) => {
  if (value.type === "conjuction") {
    value.inputs = Object.values(modules)
      .filter((f) => f.destinations.includes(value.name))
      .map((m) => {
        return  {
          name:m.name,
          pulse:'l'
        }
      });
  }
});
queue = [];
const button_pressed = () => {
  c_lp++;
  for (let i = 0; i < modules["broadcaster"].destinations.length; i++) {
    c_lp++;
    queue.push({
      module: modules["broadcaster"].destinations[i],
      pulse: "l",
    });
  }
  while (queue.length>0) {
    const curr = queue.shift();
    if (!modules[curr.module]) continue;
    if (modules[curr.module].type === 'flipflop') {
      if (curr.pulse === 'h') continue;
      if (modules[curr.module].state === 'off') {
        const conj = Object.values(modules).filter(f=>f.type === 'conjuction' && f.inputs.map(m=>m.name).includes(curr.module));
        for (let i=0;i<conj.length;i++) {
          for (let j=0;j<conj[i].inputs.length;j++) {
            if (conj[i].inputs[j].name === curr.module) conj[i].inputs[j].pulse = 'h';
          }
        }

        modules[curr.module].state = 'on';
        for (let i=0;i<modules[curr.module].destinations.length;i++) {
          c_hp++;
          queue.push({
            module: modules[curr.module].destinations[i],
            pulse: "h",
  
          });
        }
      } else {
        modules[curr.module].state = 'off';
        const conj = Object.values(modules).filter(f=>f.type === 'conjuction' && f.inputs.map(m=>m.name).includes(curr.module));
        for (let i=0;i<conj.length;i++) {
          for (let j=0;j<conj[i].inputs.length;j++) {
            if (conj[i].inputs[j].name === curr.module) conj[i].inputs[j].pulse = 'l';
          }
        }

        for (let i=0;i<modules[curr.module].destinations.length;i++) {
          c_lp++;
          queue.push({
            module: modules[curr.module].destinations[i],
            pulse: "l",
 
          });
        }
      }
    }
    if (modules[curr.module].type==='conjuction') {
      if (modules[curr.module].inputs.every(e=>(e.pulse ?? 'l') === 'h')) {
        const conj = Object.values(modules).filter(f=>f.type === 'conjuction' && f.inputs.map(m=>m.name).includes(curr.module));
        for (let i=0;i<conj.length;i++) {
          for (let j=0;j<conj[i].inputs.length;j++) {
            if (conj[i].inputs[j].name === curr.module) conj[i].inputs[j].pulse = 'l';
          }
        }

        for (let i=0;i<modules[curr.module].destinations.length;i++) {
          c_lp++;
          queue.push({
            module: modules[curr.module].destinations[i],
            pulse: "l",
          });
        }

      } else {
        const conj = Object.values(modules).filter(f=>f.type === 'conjuction' && f.inputs.map(m=>m.name).includes(curr.module));
        for (let i=0;i<conj.length;i++) {
          for (let j=0;j<conj[i].inputs.length;j++) {
            if (conj[i].inputs[j].name === curr.module) conj[i].inputs[j].pulse = 'h';
          }
        }

        for (let i=0;i<modules[curr.module].destinations.length;i++) {
          c_hp++;
          queue.push({
            module: modules[curr.module].destinations[i],
            pulse: "h",
          });
        }

      }

    }

  }

};
let c_hp = 0;
let c_lp = 0;
for (let i = 0; i < 1000; i++) {
  queue = [];
  button_pressed();
}
console.log(c_hp * c_lp);
console.log("");
