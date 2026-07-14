const fs = require('fs');
let content = fs.readFileSync('src/types.ts', 'utf8');

content = content.replace(
  'export interface BudgetAllocation {\n  id: string;',
  'export interface BudgetAllocation {\n  id: string;\n  fiscalYearId: string;'
);

fs.writeFileSync('src/types.ts', content);
console.log("Patched types");
