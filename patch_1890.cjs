const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target = `                  {budgets.map((b) => {
                    const isOverspent = b.budgetUtilized >= b.budgetAllocation;
                    
                    // DERIVING DETAILED OBLIGATIONS METRICS FOR DETAILED TRACKING requirements
                    const deptYearTxns = yearFilteredTxns.filter(t => (t.department || "").toLowerCase() === b.department.toLowerCase());
                    const obligations = deptYearTxns.filter(t => t.status === "Validated" || t.status === "Liquidated").reduce((sum, t) => sum + t.amount, 0);`;

const replacement = `                  {budgets.map((b) => {
                    // DERIVING DETAILED OBLIGATIONS METRICS FOR DETAILED TRACKING requirements
                    const deptYearTxns = yearFilteredTxns.filter(t => (t.department || "").toLowerCase() === b.department.toLowerCase());
                    const obligations = deptYearTxns.filter(t => t.status === "Validated" || t.status === "Liquidated").reduce((sum, t) => sum + t.amount, 0);
                    const isOverspent = obligations >= (b.budgetAllocation + (b.carryOver || 0));`;

content = content.replace(target, replacement);
fs.writeFileSync('src/components/FinanceView.tsx', content);
console.log("Patched 1890");
