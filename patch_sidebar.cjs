const fs = require('fs');
let content = fs.readFileSync('src/components/Sidebar.tsx', 'utf8');

content = content.replace(
  '  Key\n} from "lucide-react";',
  '  Key,\n  Database,\n  Download,\n  Upload\n} from "lucide-react";'
);

content = content.replace(
  `    // ADMIN ONLY (AUDIT TRAIL)
    { 
      id: "audit", 
      label: "Security Audit Logs", 
      icon: ShieldAlert,
      visible: role === UserRole.SUPER_ADMIN 
    }`,
  `    // ADMIN ONLY (UTILITIES)
    { 
      id: "utilities", 
      label: "Utilities", 
      icon: Database,
      visible: role === UserRole.SUPER_ADMIN,
      subItems: [
        { id: "backup-restore", label: "Backup & Restore", icon: Download, visible: true },
        { id: "audit", label: "Security Audit Logs", icon: ShieldAlert, visible: true }
      ]
    }`
);

fs.writeFileSync('src/components/Sidebar.tsx', content);
