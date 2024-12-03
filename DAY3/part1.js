const fs = require('fs')
const report = fs.readFileSync('./DAY3/input.txt', 'utf-8')

function checkMul(report) {
    const pattern = /mul\((\d{1,3}),(\d{1,3})\)/g;
    let match;
    let totalSum = 0;

    while ((match = pattern.exec(report)) !== null) {
        
        const x = parseInt(match[1], 10);
        const y = parseInt(match[2], 10);
        
        totalSum += x * y;
    }
    
    return totalSum;
}

const result = checkMul(report);
console.log(result)