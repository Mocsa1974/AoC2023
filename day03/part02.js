const fs = require('fs');
const findNumbers = () => {
    let result = [];
    for (let i = 0; i < engine.length; i++) {
        let n = '';
        let start = -1;
        let end = -1;
        for (let j = 0; j < engine[i].length; j++) {
            if (engine[i][j].number) {
                n += engine[i][j].value;
                if (start === -1) {
                    start = j;
                    end = -1;
                }
            } else {
                if (!engine[i][j].number && start !==-1) {
                    end = j-1;
                    result.push({
                        number:n,
                        start:start,
                        end:end,
                        row:i
                    });
                    n= '';
                    start = -1;
                    end = -1;
        
                }
            }
        }
        if (start !==-1 && end === -1) {
            end =engine[0].length;
            result.push({
                number:n,
                start:start,
                end:end,
                row:i
            });

        }
    }
    return result;
}

const engine = fs.readFileSync('./day03/input.txt', 'utf-8').split('\r\n')
    .map((line,row) => {
        return line.split('').map(char => {
            return {
                number: !isNaN(+char),
                value: char,
                symbol: isNaN(+char) && char !== '.',
                period: char === '.',
                row:row
            }
        })
    })
const gears = [];
const numbers = findNumbers();
engine.forEach((line,row) => {
    for (let i=0;i<line.length;i++) {
        if (line[i].symbol) gears.push({
            row:row,
            col:i
        })
    }
    ;
});
const result = [];
gears.forEach(gear=>{
    const filtered = numbers.filter(f=>{
        return ((f.row===gear.row || f.row===gear.row -1 || f.row === gear.row + 1) 
        && (gear.col>=f.start-1 && gear.col<=f.end+1));
    });
    if (filtered.length === 2) {
        result.push(+filtered[0].number * +filtered[1].number);
    }

});
console.log(result.reduce((acc,curr) => {
    return acc + +curr
},0));
