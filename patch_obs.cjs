const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target1 = `                    // DERIVING DETAILED OBLIGATIONS METRICS FOR DETAILED TRACKING requirements
                    const obligations = b.budgetUtilized;
                    const disbursements = b.budgetUtilized;
                    const unpaidObligations = obligations - disbursements; 
                    const availableBalance = b.budgetAllocation + (b.carryOver || 0) - obligations;`;

const replacement1 = `                    // DERIVING DETAILED OBLIGATIONS METRICS FOR DETAILED TRACKING requirements
                    const deptYearTxns = yearFilteredTxns.filter(t => (t.department || "").toLowerCase() === b.department.toLowerCase());
                    const obligations = deptYearTxns.filter(t => t.status === "Validated" || t.status === "Liquidated").reduce((sum, t) => sum + t.amount, 0);
                    const disbursements = deptYearTxns.filter(t => t.status === "Liquidated").reduce((sum, t) => sum + t.amount, 0);
                    const unpaidObligations = obligations - disbursements; 
                    const availableBalance = b.budgetAllocation + (b.carryOver || 0) - obligations;`;

const target2 = `                       const txDisbursements = deptTxns
                         .filter(t => t.status === "Liquidated")
                         .reduce((sum, t) => sum + t.amount, 0);

                       const obligations = b.budgetUtilized;
                       const disbursements = b.budgetUtilized;`;

const replacement2 = `                       const txDisbursements = deptTxns
                         .filter(t => t.status === "Liquidated")
                         .reduce((sum, t) => sum + t.amount, 0);

                       const obligations = txObligations;
                       const disbursements = txDisbursements;`;

const target3 = `                                 const txDisbursements = deptTxns
                                   .filter(t => t.status === "Liquidated")
                                   .reduce((sum, t) => sum + t.amount, 0);

                                 const obligations = b.budgetUtilized;
                                 const disbursements = b.budgetUtilized;`;

const replacement3 = `                                 const txDisbursements = deptTxns
                                   .filter(t => t.status === "Liquidated")
                                   .reduce((sum, t) => sum + t.amount, 0);

                                 const obligations = txObligations;
                                 const disbursements = txDisbursements;`;


content = content.replace(target1, replacement1);
content = content.replace(target2, replacement2);
content = content.replace(target3, replacement3);

fs.writeFileSync('src/components/FinanceView.tsx', content);
console.log("Patched!");
