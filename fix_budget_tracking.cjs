const fs = require('fs');

// 1. Update src/types.ts
let typesContent = fs.readFileSync('src/types.ts', 'utf8');
typesContent = typesContent.replace(
`  budgetPercentageUsed: number;
}`,
`  budgetPercentageUsed: number;
  unliquidatedAdvances?: number;
}`
);
fs.writeFileSync('src/types.ts', typesContent);

// 2. Update server.ts Integration Link logic
let serverContent = fs.readFileSync('server.ts', 'utf8');
serverContent = serverContent.replace(
`  // Deduct refund from utilized budget when Integration Link is established
  if (budget) {
    budget.budgetUtilized -= refund;
    budget.remainingBudget = budget.budgetAllocation - budget.budgetUtilized;
    budget.budgetPercentageUsed = Math.round((budget.budgetUtilized / budget.budgetAllocation) * 100);
  }`,
`  // Deduct refund from utilized budget when Integration Link is established
  if (budget) {
    budget.budgetUtilized -= refund;
    budget.unliquidatedAdvances = (budget.unliquidatedAdvances || 0) + refund;
    budget.remainingBudget = budget.budgetAllocation - budget.budgetUtilized - budget.unliquidatedAdvances;
    budget.budgetPercentageUsed = Math.round((budget.budgetUtilized / budget.budgetAllocation) * 100);
  }`
);
fs.writeFileSync('server.ts', serverContent);

// 3. Update FinanceView.tsx Integration Link state update
let clientContent = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');
const clientTarget = `                                    const utilized = b.budgetUtilized - refund;
                                    return {
                                      ...b,
                                      budgetUtilized: utilized,
                                      remainingBudget: b.budgetAllocation - utilized,
                                      budgetPercentageUsed: Math.round((utilized / b.budgetAllocation) * 100)
                                    };`;
const clientReplacement = `                                    const utilized = b.budgetUtilized - refund;
                                    const unliquidated = (b.unliquidatedAdvances || 0) + refund;
                                    return {
                                      ...b,
                                      budgetUtilized: utilized,
                                      unliquidatedAdvances: unliquidated,
                                      remainingBudget: b.budgetAllocation - utilized - unliquidated,
                                      budgetPercentageUsed: Math.round((utilized / b.budgetAllocation) * 100)
                                    };`;
clientContent = clientContent.replace(clientTarget, clientReplacement);

// Update SAAODB rendering in FinanceView.tsx
const saaodbTarget = `                                 const obligations = b.budgetUtilized;
                                 const disbursements = b.budgetUtilized;

                                 const unpaidObs = obligations - disbursements;
                                 const remAllotment = b.budgetAllocation - obligations;`;
const saaodbReplacement = `                                 const obligations = b.budgetUtilized;
                                 const disbursements = b.budgetUtilized;
                                 const unliquidated = b.unliquidatedAdvances || 0;

                                 const unpaidObs = obligations - disbursements;
                                 const remAllotment = b.budgetAllocation - obligations - unliquidated;`;
clientContent = clientContent.replace(saaodbTarget, saaodbReplacement);

// Update Budget Display Cards in FinanceView.tsx
const cardTarget = `                      <div key={b.id} className="bg-white border border-slate-200 hover:border-blue-400 transition-all rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">`;
const cardReplacement = `                      <div key={b.id} className="bg-white border border-slate-200 hover:border-blue-400 transition-all rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">`;

// Add Unliquidated to card details
const cardDetailsTarget = `                            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                              <span className="text-slate-500 font-medium">Utilized:</span>
                              <span className="font-bold text-slate-800">{formatCurrency(b.budgetUtilized)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-1">
                              <span className="text-slate-500 font-medium text-xs">Available Free Balance:</span>
                              <span className="font-black text-emerald-600 text-sm">{formatCurrency(b.remainingBudget)}</span>
                            </div>`;
const cardDetailsReplacement = `                            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                              <span className="text-slate-500 font-medium">Utilized:</span>
                              <span className="font-bold text-slate-800">{formatCurrency(b.budgetUtilized)}</span>
                            </div>
                            {(b.unliquidatedAdvances || 0) > 0 && (
                              <div className="flex justify-between items-center border-b border-slate-100 pb-2 pt-1">
                                <span className="text-amber-600 font-medium text-[10px] uppercase">Unliquidated Advances:</span>
                                <span className="font-bold text-amber-600">{formatCurrency(b.unliquidatedAdvances || 0)}</span>
                              </div>
                            )}
                            <div className="flex justify-between items-center pt-1">
                              <span className="text-slate-500 font-medium text-xs">Available Free Balance:</span>
                              <span className="font-black text-emerald-600 text-sm">{formatCurrency(b.remainingBudget)}</span>
                            </div>`;
clientContent = clientContent.replace(cardDetailsTarget, cardDetailsReplacement);


fs.writeFileSync('src/components/FinanceView.tsx', clientContent);
