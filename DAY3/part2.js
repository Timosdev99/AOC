const fs = require('fs')
const report = fs.readFileSync('./DAY3/input.txt', 'utf-8')

function calConditionalMul(report) {
    const instructionPattern = /(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g;
    const mulPattern = /mul\((\d{1,3}),(\d{1,3})\)/;

   
    const instructions = report.match(instructionPattern) || [];


    let isEnabled = true;
    let totalSum = 0;

   
    for (const instruction of instructions) {
        if (instruction === "do()") {
            isEnabled = true; 
        } else if (instruction === "don't()") {
            isEnabled = false; 
        } else if (mulPattern.test(instruction) && isEnabled) {
            
            const [, x, y] = instruction.match(mulPattern);
            totalSum += parseInt(x, 10) * parseInt(y, 10); 
        }
    }

    return totalSum
}

const result = calConditionalMul(report);
console.log( result);