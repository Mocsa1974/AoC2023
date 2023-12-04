const fs = require('fs');
console.log(fs.readFileSync('./day01/input.txt','utf-8')
.split('\r\n')
.map(m=> {
    const numbers = m.replace(/[a-z\s]/g,"");
    return numbers[0] + numbers[numbers.length - 1];
})
.reduce((acc,curr) => {
    return acc + +curr;
},0));
