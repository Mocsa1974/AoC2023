const fs = require('fs')
const r = fs
.readFileSync('./day02/input.txt','utf-8')
.split('\r\n')
.map((line,idx) => {
    let red=0;green=0;blue=0;

    const [_,game_data] = line.replace(/\s/g,"").split(':');
    const sections = game_data.split(';');
    console.log(game_data);
    for (const section of sections) {
        const rgbs =section.split(',');
//        red =0;green = 0;blue = 0;
        for (const value of rgbs) {
            if (value.indexOf('red') !==-1) {
                if (red<+parseInt(value)) red=+parseInt(value);
                
            }
            if (value.indexOf('blue') !==-1) {
                if (blue<+parseInt(value)) blue=+parseInt(value);
            }
            if (value.indexOf('green') !==-1) {
                if (green<+parseInt(value)) green=+parseInt(value);
            }
        }
    }
    return red*blue*green;
});
console.log(r);
console.log(r.reduce((acc,curr)=> {
    return acc + +curr;
},0));
