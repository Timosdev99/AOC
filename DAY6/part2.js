const fs = require('fs');


const input = fs.readFileSync('./DAY6/input.txt', 'utf-8').split('\n');

let guardPosition = null;
let guardDirection = null;
const directions = {
    '^': [-1, 0],
    '>': [0, 1],
    'v': [1, 0],
    '<': [0, -1]
};
const turnRight = {
    '^': '>',
    '>': 'v',
    'v': '<',
    '<': '^'
};

for (let r = 0; r < input.length; r++) {
    for (let c = 0; c < input[r].length; c++) {
        if ('^>v<'.includes(input[r][c])) {
            guardPosition = [r, c];
            guardDirection = input[r][c];
            break;
        }
    }
    if (guardPosition) break;
}

function simulatePatrol(grid, obstruction = null) {
    const visited = new Set();
    const path = [];
    let position = [...guardPosition];
    let direction = guardDirection;

    while (true) {
        const [row, col] = position;
        const [dRow, dCol] = directions[direction];
        const nextRow = row + dRow;
        const nextCol = col + dCol;

        if (
            nextRow < 0 || nextRow >= grid.length ||
            nextCol < 0 || nextCol >= grid[0].length
        ) break;

        if (obstruction && nextRow === obstruction[0] && nextCol === obstruction[1]) {
            grid[nextRow][nextCol] = '#';
        }

        if (grid[nextRow][nextCol] === '#') {
            direction = turnRight[direction];  
        } else {
            
            position = [nextRow, nextCol];
            const key = `${position[0]},${position[1]},${direction}`;
            if (visited.has(key)) return true; 
            visited.add(key);
            path.push(key);
        }
    }

    return false; 
}

const visitedPositions = new Set();
const grid = input.map(row => row.split(''));
simulatePatrol(grid);
grid.forEach((row, r) => {
    row.forEach((cell, c) => {
        if (cell === '.' && !(r === guardPosition[0] && c === guardPosition[1])) {
            const testGrid = input.map(row => row.split(''));
            if (simulatePatrol(testGrid, [r, c])) {
                visitedPositions.add(`${r},${c}`);
            }
        }
    });
});

console.log(visitedPositions.size);
