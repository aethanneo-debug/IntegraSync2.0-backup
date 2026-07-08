const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

content = content.replace(
  'auditLogs: AuditLog[];',
  'auditLogs: AuditLog[];\n  backups?: any[];'
);

content = content.replace(/createAuditLog\(\s*req\.user\.id,\s*req\.user\.role,\s*"CREATE",\s*"Backup",\s*newBackup\.id,\s*null,\s*"Generated manual system backup"\s*\);/g, 
'logEvent(req.user.id, req.user.username, req.user.role, "Create Backup", "Generated manual system backup " + newBackup.id);');

content = content.replace(/createAuditLog\(\s*req\.user\.id,\s*req\.user\.role,\s*"UPDATE",\s*"Backup",\s*req\.params\.id,\s*null,\s*"Restored system database from backup archive"\s*\);/g, 
'logEvent(req.user.id, req.user.username, req.user.role, "Restore Backup", "Restored system database from backup archive " + req.params.id);');

content = content.replace(/createAuditLog\(\s*req\.user\.id,\s*req\.user\.role,\s*"DELETE",\s*"Backup",\s*req\.params\.id,\s*null,\s*"Deleted system backup archive"\s*\);/g, 
'logEvent(req.user.id, req.user.username, req.user.role, "Delete Backup", "Deleted system backup archive " + req.params.id);');

fs.writeFileSync('server.ts', content);
