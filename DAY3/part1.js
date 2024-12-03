const fs = require('fs')
const report = fs.readFileSync('./DAY3/input.txt', 'utf-8')

function checkMul(report) {
    
    
    // Define the regex pattern for valid mul(X,Y) instructions
    const pattern = /mul\((\d{1,3}),(\d{1,3})\)/g;
    
    // Find all matches
    let match;
    let totalSum = 0;

    while ((match = pattern.exec(report)) !== null) {
        // Extract the two numbers
        const x = parseInt(match[1], 10);
        const y = parseInt(match[2], 10);
        
        // Compute the product and add to the sum
        totalSum += x * y;
    }
    
    return totalSum;
}

const result = checkMul(report);
console.log(result)