const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// Replace finance-action logic
const financeActionStart = content.indexOf('app.put("/api/liquidation-submissions/:id/finance-action"');
const financeActionEnd = content.indexOf('app.put("/api/liquidation-submissions/:id/chief-action"');

const chiefActionStart = content.indexOf('app.put("/api/liquidation-submissions/:id/chief-action"');
const chiefActionEnd = content.indexOf('// E. SYSTEM AUDIT ENDPOINTS', chiefActionStart);

// Let's just string replace the specific lines inside finance-action

let newFinanceAction = `app.put("/api/liquidation-submissions/:id/finance-action", authenticateToken, (req: any, res) => {
  if (req.user.role !== UserRole.FINANCE_OFFICER) {
    return res.status(403).json({ status: "error", message: "Access restricted to Financial Officer validations" });
  }

  const { id } = req.params;
  const { action, remarks } = req.body; // action: "Validate" | "Return"

  const sub = db.liquidationSubmissions.find(l => l.id === id);
  if (!sub) return res.status(404).json({ status: "error", message: "Submission records not found" });

  if (action === "Validate") {
    sub.financeStatus = "Validated & Approved";
    sub.financeRemarks = remarks || "Financial documentations, vouchers, and ledger matching validated and finalized.";
    sub.financeValidatedBy = req.user.fullName;
    sub.financeValidatedAt = new Date().toISOString();
    
    // Bypass Chief - Finalize Record
    sub.divisionChiefStatus = "Bypassed (Auto-Approved by Finance)";
    sub.divisionChiefRemarks = "Validation finalized at Finance level.";
    sub.divisionChiefApprovedBy = "System";
    sub.divisionChiefApprovedAt = new Date().toISOString();
    sub.status = "Completed";

    const act = db.activities.find(a => a.id === sub.activityId);
    if (act) {
      const budget = db.budgetAllocations.find(b => b.id === act.budgetId || b.department === act.title);
      if (budget) {
        budget.budgetUtilized += sub.totalSpent;
        budget.remainingBudget = budget.budgetAllocation - budget.budgetUtilized;
        budget.budgetPercentageUsed = Math.round((budget.budgetUtilized / budget.budgetAllocation) * 100);
      }
    }

    db.financialTransactions.push({
      id: \`tx-\${Date.now()}\`,
      transactionId: \`TX-LIQ-\${Date.now().toString().slice(-4)}\`,
      transactionDate: new Date().toISOString().split("T")[0],
      supplier: "Regional Expenses",
      amount: sub.totalSpent,
      description: \`Official travel liquidation for activity: \${act ? act.title : sub.submissionNo}\`,
      status: TransactionStatus.LIQUIDATED,
      supportingDocuments: sub.supportingDocs.map((d: any) => ({
        id: d.id,
        name: d.name,
        type: d.type,
        filename: d.filename,
        uploadedAt: d.uploadedAt,
        validationStatus: "Validated"
      })),
      history: [
        { id: \`his-\${Date.now()}\`, status: TransactionStatus.LIQUIDATED, changedBy: req.user.fullName, changedAt: new Date().toISOString(), remarks: "Approved and finalized by Finance" }
      ],
      employeeRef: sub.employeeId,
      department: "Administrative and Finance Division",
      category: "Travel",
      createdBy: sub.employeeName,
      dateCreated: new Date().toISOString()
    });

    if (!db.notifications) db.notifications = [];
    db.notifications.push({
      id: \`notif-\${Date.now()}\`,
      title: "Liquidation APPROVED & FINALIZED",
      message: \`Your liquidation report \${sub.submissionNo} has been validated and finalized by Finance.\`,
      isRead: false,
      type: "success",
      timestamp: new Date().toISOString(),
      targetRole: UserRole.EMPLOYEE,
      targetEmployeeId: sub.employeeId
    });
  } else {
    sub.financeStatus = "Returned by Finance";
    sub.financeRemarks = remarks || "Receipt vouchers incomplete; returned for clarification.";
    sub.status = "Returned";

    if (!db.notifications) db.notifications = [];
    db.notifications.push({
      id: \`notif-\${Date.now()}\`,
      title: "Liquidation Submission Returned (Finance)",
      message: \`Your liquidation report \${sub.submissionNo} was returned by Finance: \${remarks}\`,
      isRead: false,
      type: "warning",
      timestamp: new Date().toISOString(),
      targetRole: UserRole.EMPLOYEE,
      targetEmployeeId: sub.employeeId
    });
  }

  logEvent(req.user.id, req.user.username, req.user.role, "Finance Validate Liquidation", \`Finance evaluated liquidation \${sub.submissionNo} with action \${action}\`);
  saveDB();
  res.json({ status: "success", data: sub });
});\n`;

content = content.substring(0, financeActionStart) + newFinanceAction + content.substring(chiefActionStart);
fs.writeFileSync('server.ts', content);
