
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

const visited = new Set();
visited.add(`${guardPosition[0]},${guardPosition[1]}`);

while (true) {
    const [row, col] = guardPosition;
    const [dRow, dCol] = directions[guardDirection];
    const nextRow = row + dRow;
    const nextCol = col + dCol;

    if (
        nextRow < 0 || nextRow >= input.length ||
        nextCol < 0 || nextCol >= input[0].length
    ) {
        break;
    }

    if (input[nextRow][nextCol] === '#') {
        guardDirection = turnRight[guardDirection];
    } else {
        guardPosition[0] = nextRow;
        guardPosition[1] = nextCol;
        visited.add(`${guardPosition[0]},${guardPosition[1]}`);
    }
}

console.log(visited.size);
