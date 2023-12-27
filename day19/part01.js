const check = (rating) => {
    let key ='in';
    while (key !== 'A' && key !== 'R') {
        let eval_str ="";
        workflows[key].forEach(f=> {
            if (f.indexOf('>') !==-1 || f.indexOf('<') !==-1) {
                let [cond,goto] = f.split(':');
                if (cond.indexOf('x') !== -1) {
                    const f_num= rating.filter(f=>f.indexOf('x=') !==-1);
                    const num = +f_num[0].split('=')[1];
                    cond = cond.replace('x',num);
                }
                if (cond.indexOf('m') !== -1) {
                    const f_num= rating.filter(f=>f.indexOf('m=') !==-1);
                    const num = +f_num[0].split('=')[1];
                    cond = cond.replace('m',num);
                }
                if (cond.indexOf('a') !== -1) {
                    const f_num= rating.filter(f=>f.indexOf('a=') !==-1);
                    const num = +f_num[0].split('=')[1];
                    cond = cond.replace('a',num);
                }
                if (cond.indexOf('s') !== -1) {
                    const f_num= rating.filter(f=>f.indexOf('s=') !==-1);
                    const num = +f_num[0].split('=')[1];
                    cond = cond.replace('s',num);
                }

                eval_str+=":"+cond+"?"+"'"+goto+"'";
            } else eval_str+=":"+"'"+f+"'";
        });
        eval_str = eval_str.substring(1);
        key = eval(eval_str);
    }
    if (key === 'A') {
        return rating.reduce((acc,curr) => {
            const [variable,value] = curr.split('=');
            return acc+ +value;
        },0)
    } else {
        return 0;
    }
}
const fs = require('fs');
const [w,r] = fs.readFileSync('./day19/input.txt','utf-8').split('\r\n\r\n');
workflows = {};
ratings = [];
w.split('\r\n').forEach(workflow => {
    [_name,value] = workflow.split('{');
    workflows[_name] = value.replace('}','').split(',');
});
r.split('\r\n').forEach(rating => {
    ratings.push(rating.replace(/[{}]/g,'').split(','));
});
console.log(ratings.map(m=> {
    return check(m);
}).reduce((acc,curr)=> {
    return acc+curr;
},0));


