const fs = require('fs');

function countWordOccurrences(filePath, word) {
    
    const grid = fs.readFileSync(filePath, 'utf-8').trim().split('\n').map(line => line.split(''));
    
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [
        [0, 1],   
        [0, -1],  
        [1, 0],   
        [-1, 0],  
        [1, 1],   
        [1, -1], 
        [-1, 1],  
        [-1, -1],
    ];
    let count = 0;

    const isValid = (x, y) => x >= 0 && x < rows && y >= 0 && y < cols;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            for (const [dx, dy] of directions) {
                let found = true;

                for (let k = 0; k < word.length; k++) {
                    const x = i + k * dx;
                    const y = j + k * dy;

                    if (!isValid(x, y) || grid[x][y] !== word[k]) {
                        found = false;
                        break;
                    }
                }

                if (found) {
                    count++;
                }
            }
        }
    }

    return count;
}


const filePath = './DAY4/input.txt'; 
const word = 'XMAS';
const result = countWordOccurrences(filePath, word);
console.log(result);
