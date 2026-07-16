const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const tgt = `        return {
          ...b,
          id: \`b-\${Date.now()}-\${Math.floor(Math.random() * 1000)}\`,
          fiscalYearId: newFy.id,
          budgetAllocation: spentLastYear,
          carryOver: leftover,
          budgetUtilized: 0,
          remainingBudget: spentLastYear + leftover,
          budgetPercentageUsed: 0
        };`;

const rep = `        return {
          ...b,
          id: \`b-\${Date.now()}-\${Math.floor(Math.random() * 1000)}\`,
          fiscalYearId: newFy.id,
          budgetAllocation: 0,
          carryOver: leftover,
          budgetUtilized: 0,
          remainingBudget: leftover,
          budgetPercentageUsed: 0,
          allocatedPS: 0,
          allocatedMOOE: 0,
          allocatedCO: 0,
          utilizedPS: 0,
          utilizedMOOE: 0,
          utilizedCO: 0,
          remainingPS: 0,
          remainingMOOE: 0,
          remainingCO: 0,
          unliquidatedAdvances: 0
        };`;

code = code.replace(tgt, rep);
fs.writeFileSync('server.ts', code);
