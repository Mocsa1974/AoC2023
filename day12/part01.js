const fs = require('fs');
const result = fs.readFileSync('./day12/input.txt','utf-8').split('\r\n').map(m=> {
    const [l,r] = m.split(' ');
    const sizes = r.split(',');
    const springs = l;
    const count = springs.split('').filter(f=>f=== '?').length;
    let sum = 0;
    for (let i=0;i<Math.pow(2,count);i++) {
        const bin = i.toString(2).padStart(count,'0').replace(/0/g,".").replace(/1/g,'#');
        let s = '';
        let _idx = 0;
        springs.split('').forEach((f)=>{
            if (f==='?') {
                s+= bin[_idx];
                _idx++;
            } else s+=f;

        });
        const matches = s.match(/[.]*[#]*/g).map(m=>m.replace(/\./g,'')).filter(f=>f !== '');
        let match = true;
        if (matches.length === sizes.length) {
            for (let j = 0;j<matches.length;j++) {
                if (matches[j].length !== +sizes[j]) {
                    match = false;
                }
            }
        } else match = false;
        if (match) {
            sum++;
        }
    }
    return sum;
})
console.log(result.reduce((acc,curr) => {
    return acc+curr;
},0));