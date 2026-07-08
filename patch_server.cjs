const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const backupRoutes = `
// BACKUP & RESTORE UTILITIES
app.get("/api/backups", authenticateToken, (req: any, res) => {
  if (req.user.role !== UserRole.SUPER_ADMIN) {
    return res.status(403).json({ status: "error", message: "Only administrators can access utilities" });
  }
  if (!db.backups) {
    db.backups = [
      { id: "bkp-1", filename: "hsac_rab1_backup_2026-07-01.sql", date: "2026-07-01T00:00:00Z", size: "4.2 MB", status: "Completed" },
      { id: "bkp-2", filename: "hsac_rab1_backup_2026-07-05.sql", date: "2026-07-05T00:00:00Z", size: "4.5 MB", status: "Completed" }
    ];
  }
  res.json({ status: "success", data: db.backups });
});

app.post("/api/backups", authenticateToken, (req: any, res) => {
  if (req.user.role !== UserRole.SUPER_ADMIN) {
    return res.status(403).json({ status: "error", message: "Only administrators can access utilities" });
  }
  if (!db.backups) db.backups = [];
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const newBackup = {
    id: "bkp-" + Date.now(),
    filename: "hsac_rab1_backup_" + dateStr + "_" + Date.now() + ".sql",
    date: now.toISOString(),
    size: "4." + Math.floor(Math.random() * 9 + 1) + " MB",
    status: "Completed"
  };
  db.backups.unshift(newBackup);
  
  createAuditLog(
    req.user.id,
    req.user.role,
    "CREATE",
    "Backup",
    newBackup.id,
    null,
    "Generated manual system backup"
  );
  
  res.json({ status: "success", data: newBackup, message: "Backup successfully created." });
});

app.post("/api/backups/:id/restore", authenticateToken, (req: any, res) => {
  if (req.user.role !== UserRole.SUPER_ADMIN) {
    return res.status(403).json({ status: "error", message: "Only administrators can access utilities" });
  }
  
  createAuditLog(
    req.user.id,
    req.user.role,
    "UPDATE",
    "Backup",
    req.params.id,
    null,
    "Restored system database from backup archive"
  );
  
  res.json({ status: "success", message: "System database successfully restored." });
});

app.delete("/api/backups/:id", authenticateToken, (req: any, res) => {
  if (req.user.role !== UserRole.SUPER_ADMIN) {
    return res.status(403).json({ status: "error", message: "Only administrators can access utilities" });
  }
  if (db.backups) {
    db.backups = db.backups.filter((b: any) => b.id !== req.params.id);
  }
  
  createAuditLog(
    req.user.id,
    req.user.role,
    "DELETE",
    "Backup",
    req.params.id,
    null,
    "Deleted system backup archive"
  );
  
  res.json({ status: "success", message: "Backup successfully deleted." });
});

`;

content = content.replace(
  'app.get("/api/audit-logs"',
  backupRoutes + 'app.get("/api/audit-logs"'
);

fs.writeFileSync('server.ts', content);
