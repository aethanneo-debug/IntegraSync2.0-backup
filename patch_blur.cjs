const fs = require('fs');
let code = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const regex = /onBlur=\{\(\) => \{\n\s*const val = \(b\.allocatedPS \|\| 0\) \+ \(b\.allocatedMOOE \|\| 0\) \+ \(b\.allocatedCO \|\| 0\);\n\s*apiCall\("\/api\/budgets\/" \+ b\.id, \{\n\s*method: "PUT",\n\s*body: JSON\.stringify\(\{ budgetAllocation: val, allocatedPS: b\.allocatedPS, allocatedMOOE: b\.allocatedMOOE, allocatedCO: b\.allocatedCO \}\)\n\s*\}\)\.then\(res => \{ if\(res\.status === 'success'\) setBudgets\(budgets\.map\(bg => bg\.id === b\.id \? res\.data : bg\)\); \}\);\n\s*\}\}/g;

const replacement = `onBlur={() => {
                                        const val = (b.allocatedPS || 0) + (b.allocatedMOOE || 0) + (b.allocatedCO || 0);
                                        const currentFy = fiscalYears.find(fy => fy.label === activeFiscalYear);
                                        const hb = currentFy ? hsacBudgets.find(hb => hb.fiscalYearId === currentFy.id) : null;
                                        const approved = hb ? hb.approvedBudget : 0;
                                        
                                        const otherBudgetsSum = budgets.filter(bg => bg.id !== b.id).reduce((sum, bg) => sum + bg.budgetAllocation, 0);
                                        if (val + otherBudgetsSum > approved) {
                                          alert("Division budget cannot exceed the total approved budget for the fiscal year. Remaining available allocation is " + formatCurrency(approved - otherBudgetsSum) + ". Reverting changes.");
                                          // Revert back to fetching latest
                                          fetchFinanceAddons();
                                          return;
                                        }

                                        apiCall("/api/budgets/" + b.id, {
                                          method: "PUT",
                                          body: JSON.stringify({ budgetAllocation: val, allocatedPS: b.allocatedPS, allocatedMOOE: b.allocatedMOOE, allocatedCO: b.allocatedCO })
                                        }).then(res => { if(res.status === 'success') setBudgets(budgets.map(bg => bg.id === b.id ? res.data : bg)); });
                                      }}`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/FinanceView.tsx', code);
