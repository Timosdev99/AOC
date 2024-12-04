const fs = require('fs');

function countXMAS(filePath) {
   
    const grid = fs.readFileSync(filePath, 'utf-8').trim().split('\n').map(line => line.split(''));
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

   
    const isMAS = (x, y, dx1, dy1, dx2, dy2) => {
        return (
            grid[x + dx1][y + dy1] === 'M' && grid[x + dx2][y + dy2] === 'S' ||
            grid[x + dx1][y + dy1] === 'S' && grid[x + dx2][y + dy2] === 'M'
        );
    };

    
    for (let x = 1; x < rows - 1; x++) {
        for (let y = 1; y < cols - 1; y++) {
            if (grid[x][y] === 'A') {
                
                const diagonal1 = isMAS(x, y, -1, -1, 1, 1); 
                const diagonal2 = isMAS(x, y, 1, -1, -1, 1); 
                if (diagonal1 && diagonal2) {
                    count++;
                }
            }
        }
    }

    return count;
}


const filePath = './DAY4/input.txt'; 
const result = countXMAS(filePath);
console.log( result);
