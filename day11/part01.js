const fs = require('fs');
const { hasUncaughtExceptionCaptureCallback } = require('process');
const findEmptyRows = () => {
    let result = []
    map.forEach((m,idx)=> {
        if (m.every(e=>e === '.')) {
            result.push(idx);
        }
    })
    return result;
}
const findEmptyCols = () => {
    let result = [];
    let cols = [];
    map.forEach((m,idx)=> {
        cols = m.map((_,idx2)=>map[idx2][idx]);
        if (cols.every(e=>e === '.')) result.push(idx);
    })
    return result;
    
}
const expandMap = () => {
    let empty_rows = findEmptyRows();
    let empty_cols = findEmptyCols();
    for (let i=0;i<empty_rows.length;i++) {
        let arr = [];
        for (let j=0;j<cols;j++) arr.push('.');
        map.splice(empty_rows[i]+i,0,arr);
    }
    map.forEach(f=> {
        for (let i=0;i<empty_cols.length;i++) {
            f.splice(empty_cols[i]+i,0,'.');
        }
    })

}
const numberGalaxies = () => {
    let number = 1;
    let result = [];
    for (let i=0;i<map.length;i++) {
        for (let j=0;j<map[i].length;j++) {
            if (map[i][j] === '#') {
                map[i][j] = number;
                result.push({
                    number:number,
                    row:i,
                    col:j
                })
                number++;
            }
        }
    }
    return result;
}
const findShortestPaths = () => {
    let result = [];
    for (let i=0;i<galaxies.length;i++) {
        for (let j=i+1;j<galaxies.length;j++) {
            result.push(Math.abs(galaxies[i].row - galaxies[j].row) + Math.abs(galaxies[i].col - galaxies[j].col));
        }
    }
    return result;
}
const map = fs
.readFileSync('./day11/example.txt','utf-8')
.split('\r\n')
.map(line => {
    return line.split('');
});
const cols = map[0].length;
expandMap();
const galaxies = numberGalaxies();
console.log(findShortestPaths());
console.log(findShortestPaths().reduce((acc,curr)=> {
    return acc+curr;
},0));
