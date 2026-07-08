const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const newRoutes = `
app.post("/api/admin/users/:id/archive", authenticateToken, (req: any, res) => {
  if (req.user.role !== UserRole.SUPER_ADMIN) {
    return res.status(403).json({ status: "error", message: "Requires Administrator privileges" });
  }
  const { id } = req.params;
  const targetUser = db.users.find(u => u.id === id);
  if (!targetUser) return res.status(404).json({ status: "error", message: "User not found" });
  if (targetUser.username === "admin" || targetUser.id === req.user.id) {
    return res.status(400).json({ status: "error", message: "Cannot archive the seed superuser or your own account" });
  }

  targetUser.status = "Archived";
  logEvent(req.user.id, req.user.username, req.user.role, "Archived", \`Archived user account: \${targetUser.username}\`);
  saveDB();
  res.json({ status: "success", message: "User account archived" });
});

app.post("/api/admin/users/:id/restore", authenticateToken, (req: any, res) => {
  if (req.user.role !== UserRole.SUPER_ADMIN) {
    return res.status(403).json({ status: "error", message: "Requires Administrator privileges" });
  }
  const { id } = req.params;
  const targetUser = db.users.find(u => u.id === id);
  if (!targetUser) return res.status(404).json({ status: "error", message: "User not found" });

  targetUser.status = "Active";
  logEvent(req.user.id, req.user.username, req.user.role, "Restored", \`Restored user account: \${targetUser.username}\`);
  saveDB();
  res.json({ status: "success", message: "User account restored" });
});

app.delete("/api/admin/users/:id"`;

content = content.replace('app.delete("/api/admin/users/:id"', newRoutes);
fs.writeFileSync('server.ts', content);
