const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// Fix PUT route destructuring
code = code.replace(
  '  const { budgetAllocation, approvedRequestId } = req.body;',
  '  const { budgetAllocation, allocatedPS, allocatedMOOE, allocatedCO, approvedRequestId } = req.body;'
);

// Fix budget realignment missing properties
code = code.replace(
  `        remainingBudget: reqItem.amountRequested,
        budgetPercentageUsed: 0
      });`,
  `        remainingBudget: reqItem.amountRequested,
        budgetPercentageUsed: 0,
        allocatedPS: reqItem.amountRequested,
        utilizedPS: 0,
        remainingPS: reqItem.amountRequested,
        allocatedMOOE: 0, utilizedMOOE: 0, remainingMOOE: 0,
        allocatedCO: 0, utilizedCO: 0, remainingCO: 0
      });`
);

code = code.replace(
  `        remainingBudget: reqItem.amountRequested,
        budgetPercentageUsed: 0
      });`,
  `        remainingBudget: reqItem.amountRequested,
        budgetPercentageUsed: 0,
        allocatedPS: reqItem.amountRequested,
        utilizedPS: 0,
        remainingPS: reqItem.amountRequested,
        allocatedMOOE: 0, utilizedMOOE: 0, remainingMOOE: 0,
        allocatedCO: 0, utilizedCO: 0, remainingCO: 0
      });`
);

fs.writeFileSync('server.ts', code);
console.log("Server.ts fixed missing properties.");
