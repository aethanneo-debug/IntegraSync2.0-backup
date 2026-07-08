const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const downloadRoute = `
app.get("/api/backups/:id/download", authenticateToken, (req: any, res) => {
  if (req.user.role !== UserRole.SUPER_ADMIN) {
    return res.status(403).json({ status: "error", message: "Only administrators can access utilities" });
  }
  const backup = db.backups?.find(b => b.id === req.params.id);
  if (!backup) {
    return res.status(404).json({ status: "error", message: "Backup not found" });
  }
  
  const sqlContent = "-- System Backup: " + backup.filename + "\\n-- Date: " + backup.date + "\\n\\n-- Mock SQL dump data\\nCREATE TABLE mock_table (id INT);\\nINSERT INTO mock_table VALUES (1);\\n";
  
  res.setHeader('Content-disposition', 'attachment; filename=' + backup.filename);
  res.setHeader('Content-type', 'application/sql');
  res.send(sqlContent);
});
`;

content = content.replace(
  'app.post("/api/backups/:id/restore"',
  downloadRoute + '\napp.post("/api/backups/:id/restore"'
);

fs.writeFileSync('server.ts', content);
