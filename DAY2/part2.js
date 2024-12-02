const fs = require('fs');
const inputFile = './DAY2/input.txt';

function readReportsFromFile(filename) {
  const data = fs.readFileSync(filename, 'utf-8');
  return data
    .trim()
    .split('\n')
    .map(line => line.split(' ').map(Number));
}


function isSafe(report) {
  if (report.length < 2) return true;

  let isIncreasing = null;
  for (let i = 1; i < report.length; i++) {
    const diff = report[i] - report[i - 1];

    if (diff < -3 || diff > 3 || diff === 0) {
      return false;
    }

    if (isIncreasing === null) {
      isIncreasing = diff > 0;
    } else if ((isIncreasing && diff < 0) || (!isIncreasing && diff > 0)) {
      return false;
    }
  }

  return true;
}


function canBeMadeSafe(report) {
  for (let i = 0; i < report.length; i++) {
    const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
    if (isSafe(modifiedReport)) {
      return true;
    }
  }
  return false;
}


function countSafeReports(filename) {
  const reports = readReportsFromFile(filename);
  let safeCount = 0;

  reports.forEach(report => {
    if (isSafe(report)) {
      safeCount++;
    } else if (canBeMadeSafe(report)) {
      safeCount++;
    }
  });

  return safeCount;
}



console.log(`Safe Reports: ${countSafeReports(inputFile)}`);
