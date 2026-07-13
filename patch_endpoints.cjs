const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const target1 = `app.get("/api/fiscal-years", authenticateToken, (req, res) => {
  const fyData = [
    { id: "fy-1", label: "2026", start_date: "2026-01-01", end_date: "2026-12-31", status: "Active", rollover_policy: "Standard" },
    { id: "fy-2", label: "2025", start_date: "2025-01-01", end_date: "2025-12-31", status: "Closed", rollover_policy: "Standard" },
    { id: "fy-3", label: "2024", start_date: "2024-01-01", end_date: "2024-12-31", status: "Closed", rollover_policy: "Standard" },
    { id: "fy-4", label: "2023", start_date: "2023-01-01", end_date: "2023-12-31", status: "Closed", rollover_policy: "Standard" }
  ];
  res.json(fyData);
});

app.get("/api/fiscal-years/active", authenticateToken, (req, res) => {
  res.json({ id: "fy-1", label: "2026", start_date: "2026-01-01", end_date: "2026-12-31", status: "Active", rollover_policy: "Standard" });
});`;

const replacement1 = `app.get("/api/fiscal-years", authenticateToken, (req, res) => {
  res.json(db.fiscalYears || []);
});

app.get("/api/fiscal-years/active", authenticateToken, (req, res) => {
  const active = (db.fiscalYears || []).find((f: any) => f.status === "Active");
  res.json(active || { id: "fy-1", label: "2026", start_date: "2026-01-01", end_date: "2026-12-31", status: "Active", rollover_policy: "Standard" });
});

app.post("/api/fiscal-years", authenticateToken, (req: any, res) => {
  if (req.user.role !== UserRole.SUPER_ADMIN && req.user.role !== UserRole.BUDGET_OFFICER) {
    return res.status(403).json({ status: "error", message: "Unauthorized" });
  }
  
  const { label, start_date, end_date } = req.body;
  const newFy = {
    id: \`fy-\${Date.now()}\`,
    label,
    start_date,
    end_date,
    status: "Active",
    rollover_policy: "Standard"
  };

  // Close other fiscal years and calculate carryover
  let carryOver = 0;
  const activeFy = db.fiscalYears.find((f: any) => f.status === "Active");
  if (activeFy) {
    activeFy.status = "Closed";
    const activeHb = db.hsacBudgets.find((hb: any) => hb.fiscalYearId === activeFy.id);
    if (activeHb) {
      carryOver = activeHb.approvedBudget + (activeHb.carryOverBudget || 0) - (activeHb.totalUtilized || 0);
      if (carryOver < 0) carryOver = 0; // Prevent negative carryover
    }
  }

  db.fiscalYears.unshift(newFy);

  const newHb = {
    id: \`hb-\${Date.now()}\`,
    fiscalYearId: newFy.id,
    approvedBudget: 0,
    carryOverBudget: carryOver,
    totalUtilized: 0
  };
  db.hsacBudgets.unshift(newHb);

  saveDB();
  res.json({ status: "success", data: newFy, hsacBudget: newHb });
});

app.get("/api/hsac-budgets", authenticateToken, (req, res) => {
  res.json({ status: "success", data: db.hsacBudgets || [] });
});

app.put("/api/hsac-budgets/:id", authenticateToken, (req: any, res) => {
  if (req.user.role !== UserRole.SUPER_ADMIN && req.user.role !== UserRole.BUDGET_OFFICER) {
    return res.status(403).json({ status: "error", message: "Unauthorized" });
  }
  const hb = db.hsacBudgets.find((b: any) => b.id === req.params.id);
  if (hb) {
    if (req.body.approvedBudget !== undefined) hb.approvedBudget = Number(req.body.approvedBudget);
    saveDB();
    res.json({ status: "success", data: hb });
  } else {
    res.status(404).json({ status: "error", message: "Budget not found" });
  }
});
`;

if (content.includes(target1)) {
    content = content.replace(target1, replacement1);
    fs.writeFileSync('server.ts', content);
    console.log("Endpoints patched");
} else {
    console.log("Targets not found!");
}
