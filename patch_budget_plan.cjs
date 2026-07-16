const fs = require('fs');

const typesContent = fs.readFileSync('src/types.ts', 'utf8');
if (!typesContent.includes('allocatedPS')) {
  const replacement = `export interface BudgetAllocation {
  id: string;
  fiscalYearId: string;
  department: string;
  
  budgetAllocation: number;
  budgetUtilized: number;
  remainingBudget: number;
  budgetPercentageUsed: number;
  carryOver?: number;
  unliquidatedAdvances?: number;
  
  allocatedPS: number;
  utilizedPS: number;
  remainingPS: number;
  
  allocatedMOOE: number;
  utilizedMOOE: number;
  remainingMOOE: number;
  
  allocatedCO: number;
  utilizedCO: number;
  remainingCO: number;
}`;
  fs.writeFileSync('src/types.ts', typesContent.replace(/export interface BudgetAllocation \{[\s\S]*?\n\}/, replacement));
}

let serverContent = fs.readFileSync('server.ts', 'utf8');

// Update LiquidationSubmission interface in types.ts too? Wait, LiquidationSubmission is in types.ts.
if (!typesContent.includes('expenseCategory')) {
  fs.writeFileSync('src/types.ts', fs.readFileSync('src/types.ts', 'utf8').replace(
    '  remarks: string;',
    '  remarks: string;\n  expenseCategory?: "PS" | "MOOE" | "CO";'
  ));
}
