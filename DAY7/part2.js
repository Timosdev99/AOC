const fs = require('fs');


const input = fs.readFileSync('./DAY7/input.txt', 'utf-8').trim().split('\n');

function generateOperatorCombinations(numCount) {
    const combinations = [];
    const totalCombinations = Math.pow(3, numCount - 1); 

    for (let i = 0; i < totalCombinations; i++) {
        const ops = [];
        let temp = i;
        for (let j = 0; j < numCount - 1; j++) {
            const operator = temp % 3;
            ops.push(operator === 0 ? '+' : operator === 1 ? '*' : '||');
            temp = Math.floor(temp / 3);
        }
        combinations.push(ops);
    }

    return combinations;
}

function evaluateExpression(numbers, operators) {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
            result += numbers[i + 1];
        } else if (operators[i] === '*') {
            result *= numbers[i + 1];
        } else if (operators[i] === '||') {
            result = parseInt(`${result}${numbers[i + 1]}`, 10);
        }
    }
    return result;
}

let totalCalibrationResult = 0;

input.forEach(line => {
    const [testValueStr, numbersStr] = line.split(':');
    const testValue = parseInt(testValueStr.trim(), 10);
    const numbers = numbersStr.trim().split(/\s+/).map(Number);

    const operatorCombinations = generateOperatorCombinations(numbers.length);

    for (const operators of operatorCombinations) {
        if (evaluateExpression(numbers, operators) === testValue) {
            totalCalibrationResult += testValue;
            break; 
        }
    }
});

console.log('Total Calibration Result:', totalCalibrationResult);
