const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const target = `app.get("/api/budgets", authenticateToken, (req, res) => {
  res.json({ status: "success", data: db.budgetAllocations || [] });
});`;

const replacement = `app.get("/api/budgets", authenticateToken, (req, res) => {
  let allocations = db.budgetAllocations || [];
  if (req.query.fiscalYearLabel) {
    const fy = (db.fiscalYears || []).find((f: any) => f.label === req.query.fiscalYearLabel);
    if (fy) {
      allocations = allocations.filter((b: any) => b.fiscalYearId === fy.id);
    }
  }
  res.json({ status: "success", data: allocations });
});`;

content = content.replace(target, replacement);
fs.writeFileSync('server.ts', content);
console.log("Patched api/budgets");
