const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add import
content = content.replace(
  'import AuditView from "./components/AuditView";',
  'import AuditView from "./components/AuditView";\nimport BackupRestoreView from "./components/BackupRestoreView";'
);

// Add the case statement for backup-restore
content = content.replace(
  '      case "audit":',
  `      case "backup-restore":
        if (user.role !== UserRole.SUPER_ADMIN) {
          return <div id="access-denied" className="p-6 text-xs text-rose-500 font-mono font-bold">Unauthenticated credentials path error [RA 10173 Security Block].</div>;
        }
        return <BackupRestoreView user={user} />;
      case "audit":`
);

fs.writeFileSync('src/App.tsx', content);
