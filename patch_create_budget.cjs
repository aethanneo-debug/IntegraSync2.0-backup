const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target = `                      onClick={() => {
                        if (!addBudgetForm.budgetAllocation) return alert("Allocation amount is required");
                        handleCreateBudget(addBudgetForm.department, Number(addBudgetForm.budgetAllocation));
                        setIsAddBudgetOpen(false);
                      }}`;

const replacement = `                      onClick={() => {
                        if (!addBudgetForm.budgetAllocation) return alert("Allocation amount is required");
                        const val = Number(addBudgetForm.budgetAllocation);
                        if (!isNaN(val)) {
                          const currentFy = fiscalYears.find(fy => fy.label === activeFiscalYear);
                          const hb = currentFy ? hsacBudgets.find(hb => hb.fiscalYearId === currentFy.id) : null;
                          const approved = hb ? hb.approvedBudget : 0;
                          
                          const otherBudgetsSum = budgets.reduce((sum, bg) => sum + bg.budgetAllocation, 0);
                          if (val + otherBudgetsSum > approved) {
                            alert("Division budget cannot exceed the total approved budget for the fiscal year. Remaining available allocation is " + formatCurrency(approved - otherBudgetsSum) + ".");
                            return;
                          }
                          handleCreateBudget(addBudgetForm.department, val);
                          setIsAddBudgetOpen(false);
                        }
                      }}`;

content = content.replace(target, replacement);
fs.writeFileSync('src/components/FinanceView.tsx', content);
