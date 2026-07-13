const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target = `                                  if (b.id === bud.id) {
                                    const released = Number(liq.totalReleased || 0);
                                    const spent = Number(liq.totalSpent || 0);
                                    const refund = released - spent;
                                    const utilized = b.budgetUtilized - refund;
                                    const unliquidated = (b.unliquidatedAdvances || 0) + refund;
                                    return {
                                      ...b,
                                      budgetUtilized: utilized,
                                      unliquidatedAdvances: unliquidated,
                                      remainingBudget: b.budgetAllocation - utilized - unliquidated,
                                      budgetPercentageUsed: Math.round((utilized / b.budgetAllocation) * 100)
                                    };
                                  }`;

const replacement = `                                  if (b.id === bud.id) {
                                    const spent = Number(liq.totalSpent || 0);
                                    const utilized = b.budgetUtilized + spent;
                                    const unliquidated = (b.unliquidatedAdvances || 0);
                                    return {
                                      ...b,
                                      budgetUtilized: utilized,
                                      unliquidatedAdvances: unliquidated,
                                      remainingBudget: b.budgetAllocation - utilized - unliquidated,
                                      budgetPercentageUsed: Math.round((utilized / b.budgetAllocation) * 100)
                                    };
                                  }`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('src/components/FinanceView.tsx', content);
    console.log("Replaced client budget util");
} else {
    console.log("Target not found in FinanceView.tsx");
}
