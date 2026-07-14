const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target = `                          const data = budgets.map(b => ({
                                "UACS Code": b.uacsCode || "N/A",
                                "Department": b.department,
                                "Total Allocation": b.totalAllocation,
                                "Obligations Incurred": b.budgetUtilized,
                                "Unobligated Balance": b.totalAllocation - b.budgetUtilized
                            }));`;

const replacement = `                          const data = budgets.map(b => {
                              const deptYearTxns = yearFilteredTxns.filter(t => (t.department || "").toLowerCase() === b.department.toLowerCase());
                              const obligations = deptYearTxns.filter(t => t.status === "Validated" || t.status === "Liquidated").reduce((sum, t) => sum + t.amount, 0);
                              return {
                                "UACS Code": b.uacsCode || "N/A",
                                "Department": b.department,
                                "Total Allocation": b.budgetAllocation + (b.carryOver || 0),
                                "Obligations Incurred": obligations,
                                "Unobligated Balance": b.budgetAllocation + (b.carryOver || 0) - obligations
                              };
                            });`;

content = content.replace(target, replacement);
fs.writeFileSync('src/components/FinanceView.tsx', content);
console.log("Patched export!");
