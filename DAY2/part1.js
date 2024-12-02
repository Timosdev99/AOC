const fs = require('fs');

fs.readFile('./DAY2/input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const reports = data.split('\n');
  const safePorts = reports.filter(isSafeReport);
  console.log(`Number of safe reports: ${safePorts.length}`);
});

function isSafeReport(report) {
  const levels = report.split(' ').map(Number);

  const isIncreasing = levels.every((level, i) => i === 0 || level >= levels[i - 1]);
  const isDecreasing = levels.every((level, i) => i === 0 || level <= levels[i - 1]);

  if (!isIncreasing && !isDecreasing) {
    return false;
  }

  for (let i = 1; i < levels.length; i++) {
    const diff = Math.abs(levels[i] - levels[i - 1]);
    if (diff < 1 || diff > 3) {
      return false;
    }
  }

  return true;
}

function checkUnsafe(report) {
  const levels = report.split(' ').map(Number);
}