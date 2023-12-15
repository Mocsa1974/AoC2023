const fs = require('fs');
const hashes = fs.readFileSync('./day15/input.txt','utf-8').split(',').map(m=> {
    return m.split('').reduce((acc,curr) => {
        return ((acc + curr.charCodeAt(0))*17) % 256;
    },0);
});
console.log(hashes.reduce((acc,curr)=> {
    return acc+curr;
},0));