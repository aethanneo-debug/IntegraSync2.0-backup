const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const target1 = `app.get("/api/budgets", authenticateToken, (req, res) => {
  res.json({ status: "success", data: db.budgetAllocations || [] });
});`;

const replacement1 = `app.get("/api/budgets", authenticateToken, (req, res) => {
  res.json({ status: "success", data: db.budgetAllocations || [] });
});

app.put("/api/budgets/:id", authenticateToken, (req: any, res) => {
  if (req.user.role !== UserRole.SUPER_ADMIN && req.user.role !== UserRole.BUDGET_OFFICER) {
    return res.status(403).json({ status: "error", message: "Unauthorized" });
  }
  const budget = db.budgetAllocations.find((b: any) => b.id === req.params.id);
  if (budget) {
    if (req.body.budgetAllocation !== undefined) {
      budget.budgetAllocation = Number(req.body.budgetAllocation);
      budget.remainingBudget = budget.budgetAllocation - budget.budgetUtilized - (budget.unliquidatedAdvances || 0);
      budget.budgetPercentageUsed = Math.round((budget.budgetUtilized / budget.budgetAllocation) * 100);
    }
    saveDB();
    res.json({ status: "success", data: budget });
  } else {
    res.status(404).json({ status: "error", message: "Budget not found" });
  }
});`;

if (content.includes(target1)) {
    content = content.replace(target1, replacement1);
    fs.writeFileSync('server.ts', content);
    console.log("Budget Endpoints patched");
} else {
    console.log("Targets not found!");
}
