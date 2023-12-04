const fs = require('fs');
const cards = fs.readFileSync('./day04/input.txt','utf-8')
.split('\r\n')
.map((line,idx) => {
    const [cardnumber,cardvalue] = line.split(': ');
    const [winning,mycards] = cardvalue.split(' | ');
    winning_array = winning.split(' ');
    mycard_array = mycards.split(' ').filter(f=>+f);
    const found = mycard_array.filter(f=>winning_array.includes(f)).length;
    return {
        intersect:found,
        id:idx+1,
        copies:1
    }
})
cards.forEach(card => {
    for (let i=card.id+1;i<=card.id+card.intersect;i++) {
        const c = cards.find(f=>f.id === i);
        c.copies+=card.copies;
    }
})
console.log(cards.reduce((acc,curr)=> {
    return acc + +curr.copies;
},0));