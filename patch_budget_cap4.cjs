const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target2 = `                                    onClick={() => {
                                      const val = Number(newBudgetCapVal);
                                      if (!isNaN(val)) {
                                        apiCall("/api/budgets/" + b.id, {`;

const replacement2 = `                                    onClick={() => {
                                      const val = Number(newBudgetCapVal);
                                      if (!isNaN(val)) {
                                        const currentFy = fiscalYears.find(fy => fy.label === activeFiscalYear);
                                        const hb = currentFy ? hsacBudgets.find(hb => hb.fiscalYearId === currentFy.id) : null;
                                        const approved = hb ? hb.approvedBudget : 0;
                                        
                                        const otherBudgetsSum = budgets.filter(bg => bg.id !== b.id).reduce((sum, bg) => sum + bg.budgetAllocation, 0);
                                        if (val + otherBudgetsSum > approved) {
                                          alert("Division budget cannot exceed the total approved budget for the fiscal year. Remaining available allocation is " + formatCurrency(approved - otherBudgetsSum) + ".");
                                          return;
                                        }
                                        
                                        apiCall("/api/budgets/" + b.id, {`;

content = content.replace(target2, replacement2);
fs.writeFileSync('src/components/FinanceView.tsx', content);
