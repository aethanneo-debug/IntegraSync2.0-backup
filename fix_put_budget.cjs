const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const tgt = `app.put("/api/budgets/:id", authenticateToken, (req: any, res) => {
  if (req.user.role !== UserRole.SUPER_ADMIN && req.user.role !== UserRole.BUDGET_OFFICER) {
    return res.status(403).json({ status: "error", message: "Unauthorized" });
  }
  const budget = db.budgetAllocations.find((b: any) => b.id === req.params.id);
  if (budget) {
    if (req.body.budgetAllocation !== undefined) {
      budget.budgetAllocation = Number(req.body.budgetAllocation);
      budget.remainingBudget = budget.budgetAllocation + (budget.carryOver || 0) - budget.budgetUtilized - (budget.unliquidatedAdvances || 0);
      budget.budgetPercentageUsed = Math.round((budget.budgetUtilized / (budget.budgetAllocation + (budget.carryOver || 0))) * 100);
    }
    saveDB();
    res.json({ status: "success", data: budget });
  } else {
    res.status(404).json({ status: "error", message: "Budget not found" });
  }
});`;

const rep = `app.put("/api/budgets/:id", authenticateToken, (req: any, res) => {
  if (req.user.role !== UserRole.SUPER_ADMIN && req.user.role !== UserRole.BUDGET_OFFICER) {
    return res.status(403).json({ status: "error", message: "Unauthorized" });
  }
  const budget = db.budgetAllocations.find((b: any) => b.id === req.params.id);
  if (budget) {
    if (req.body.budgetAllocation !== undefined) {
      budget.budgetAllocation = Number(req.body.budgetAllocation);
      budget.remainingBudget = budget.budgetAllocation + (budget.carryOver || 0) - budget.budgetUtilized - (budget.unliquidatedAdvances || 0);
      budget.budgetPercentageUsed = Math.round((budget.budgetUtilized / (budget.budgetAllocation + (budget.carryOver || 0))) * 100);
    }
    if (req.body.allocatedPS !== undefined) budget.allocatedPS = Number(req.body.allocatedPS);
    if (req.body.allocatedMOOE !== undefined) budget.allocatedMOOE = Number(req.body.allocatedMOOE);
    if (req.body.allocatedCO !== undefined) budget.allocatedCO = Number(req.body.allocatedCO);
    
    // Recalculate remaining amounts based on updated allocations
    budget.remainingPS = (budget.allocatedPS || 0) - (budget.utilizedPS || 0);
    budget.remainingMOOE = (budget.allocatedMOOE || 0) - (budget.utilizedMOOE || 0);
    budget.remainingCO = (budget.allocatedCO || 0) - (budget.utilizedCO || 0);

    saveDB();
    res.json({ status: "success", data: budget });
  } else {
    res.status(404).json({ status: "error", message: "Budget not found" });
  }
});`;

code = code.replace(tgt, rep);
fs.writeFileSync('server.ts', code);
