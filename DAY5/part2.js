const fs = require('fs');
const path = require('path');

function parseInput(inputText) {
    
    const sections = inputText.trim().split(/\n\n|\n/);
    
   
    const ruleEndIndex = sections.findIndex(section => 
        section.includes(',')
    );

   
    const rules = new Map();
    sections.slice(0, ruleEndIndex).forEach(line => {
        if (line.includes('|')) {
            const [before, after] = line.split('|').map(Number);
            if (!rules.has(before)) {
                rules.set(before, new Set());
            }
            rules.get(before).add(after);
        }
    });
    
  
    const updates = sections.slice(ruleEndIndex).map(line => 
        line.split(',').map(Number)
    );
    
    return { rules, updates };
}
   
function isUpdateOrdered(update, rules) {
   
    for (let i = 0; i < update.length; i++) {
        for (let j = i + 1; j < update.length; j++) {
           
            if (rules.has(update[i]) && rules.get(update[i]).has(update[j])) {
                if (update.indexOf(update[i]) > update.indexOf(update[j])) {
                    return false;
                }
            }
          
            if (rules.has(update[j]) && rules.get(update[j]).has(update[i])) {
                if (update.indexOf(update[j]) > update.indexOf(update[i])) {
                    return false;
                }
            }
        }
    }
    return true;
}

function correctUpdate(update, rules) {

    let correctedUpdate = [...update];
    
    
    let changed;
    do {
        changed = false;
        
        
        for (let i = 0; i < correctedUpdate.length; i++) {
            for (let j = i + 1; j < correctedUpdate.length; j++) {
             
                if (rules.has(correctedUpdate[i]) && 
                    rules.get(correctedUpdate[i]).has(correctedUpdate[j]) && 
                    correctedUpdate.indexOf(correctedUpdate[i]) > correctedUpdate.indexOf(correctedUpdate[j])) {
                    
                    [correctedUpdate[i], correctedUpdate[j]] = [correctedUpdate[j], correctedUpdate[i]];
                    changed = true;
                    break;
                }
                
            
                if (rules.has(correctedUpdate[j]) && 
                    rules.get(correctedUpdate[j]).has(correctedUpdate[i]) && 
                    correctedUpdate.indexOf(correctedUpdate[j]) > correctedUpdate.indexOf(correctedUpdate[i])) {
                  
                    [correctedUpdate[i], correctedUpdate[j]] = [correctedUpdate[j], correctedUpdate[i]];
                    changed = true;
                    break;
                }
            }
            
            if (changed) break;
        }
    } while (changed);
    
    return correctedUpdate;
}

function solvePuzzle(inputText) {
    const { rules, updates } = parseInput(inputText);
    const incorrectMiddlePages = [];
    
  
    for (const update of updates) {
        if (!isUpdateOrdered(update, rules)) {
           
            const correctedUpdate = correctUpdate(update, rules);
            
            const middleIndex = Math.floor(correctedUpdate.length / 2);
            incorrectMiddlePages.push(correctedUpdate[middleIndex]);
        }
    }
    

    return incorrectMiddlePages.reduce((sum, page) => sum + page, 0);
}


function main() {
    try {

        const inputText = fs.readFileSync('./DAY5/input.txt', 'utf8');
        
      
        const result = solvePuzzle(inputText);
        
        console.log(result);
    } catch (error) {
        console.error('Error reading the file:', error);
    }
}

main();