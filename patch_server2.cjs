const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const targetPost = `app.post("/api/finance/budgets", authenticateToken, (req: any, res) => {
  const { department, budgetAllocation, approvedRequestId } = req.body;`;

const replPost = `app.post("/api/finance/budgets", authenticateToken, (req: any, res) => {
  const { department, budgetAllocation, allocatedPS, allocatedMOOE, allocatedCO, approvedRequestId } = req.body;`;

const targetNewBudget = `  const newBudget: BudgetAllocation = {
    id: \`b-\${Date.now()}\`,
    fiscalYearId: activeFy?.id || "fy-1",
    department,
    budgetAllocation: Number(budgetAllocation),
    budgetUtilized: 0,
    remainingBudget: Number(budgetAllocation),
    budgetPercentageUsed: 0
  };`;

const replNewBudget = `  const ps = Number(allocatedPS) || 0;
  const mooe = Number(allocatedMOOE) || 0;
  const co = Number(allocatedCO) || 0;
  const total = ps + mooe + co;
  const finalBudgetAllocation = budgetAllocation ? Number(budgetAllocation) : total;

  const newBudget: BudgetAllocation = {
    id: \`b-\${Date.now()}\`,
    fiscalYearId: activeFy?.id || "fy-1",
    department,
    budgetAllocation: finalBudgetAllocation,
    budgetUtilized: 0,
    remainingBudget: finalBudgetAllocation,
    budgetPercentageUsed: 0,
    allocatedPS: ps,
    utilizedPS: 0,
    remainingPS: ps,
    allocatedMOOE: mooe,
    utilizedMOOE: 0,
    remainingMOOE: mooe,
    allocatedCO: co,
    utilizedCO: 0,
    remainingCO: co
  };`;

code = code.replace(targetPost, replPost);
code = code.replace(targetNewBudget, replNewBudget);

// Also need to patch PUT "/api/finance/budgets/:id" to support updating the breakdowns
const targetPut = `app.put("/api/finance/budgets/:id", authenticateToken, (req: any, res) => {
  const { id } = req.params;
  const { targetAmount, approvedRequestId } = req.body;`;

const replPut = `app.put("/api/finance/budgets/:id", authenticateToken, (req: any, res) => {
  const { id } = req.params;
  const { targetAmount, allocatedPS, allocatedMOOE, allocatedCO, approvedRequestId } = req.body;`;

const targetPutUpdate = `  budget.budgetAllocation = targetAmount;
  budget.remainingBudget = budget.budgetAllocation + (budget.carryOver || 0) - budget.budgetUtilized;
  budget.budgetPercentageUsed = Math.round((budget.budgetUtilized / (budget.budgetAllocation + (budget.carryOver || 0))) * 100);`;

const replPutUpdate = `  budget.budgetAllocation = targetAmount;
  if (allocatedPS !== undefined) {
    budget.allocatedPS = Number(allocatedPS);
    budget.remainingPS = budget.allocatedPS - (budget.utilizedPS || 0);
  }
  if (allocatedMOOE !== undefined) {
    budget.allocatedMOOE = Number(allocatedMOOE);
    budget.remainingMOOE = budget.allocatedMOOE - (budget.utilizedMOOE || 0);
  }
  if (allocatedCO !== undefined) {
    budget.allocatedCO = Number(allocatedCO);
    budget.remainingCO = budget.allocatedCO - (budget.utilizedCO || 0);
  }
  // Recompute total if breakdowns were passed
  if (allocatedPS !== undefined || allocatedMOOE !== undefined || allocatedCO !== undefined) {
    budget.budgetAllocation = (budget.allocatedPS || 0) + (budget.allocatedMOOE || 0) + (budget.allocatedCO || 0);
  }
  budget.remainingBudget = budget.budgetAllocation + (budget.carryOver || 0) - budget.budgetUtilized;
  budget.budgetPercentageUsed = Math.round((budget.budgetUtilized / (budget.budgetAllocation + (budget.carryOver || 0))) * 100);`;

code = code.replace(targetPut, replPut);
code = code.replace(targetPutUpdate, replPutUpdate);

fs.writeFileSync('server.ts', code);
console.log("Server.ts POST and PUT budget routes patched.");
