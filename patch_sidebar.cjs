const fs = require('fs');

let content = fs.readFileSync('src/components/Sidebar.tsx', 'utf8');

if (!content.includes('id: "activities"')) {
  content = content.replace(
    '{ id: "employees", label: "Employee Records", icon: Users, visible: [UserRole.SUPER_ADMIN, UserRole.HR_OFFICER].includes(role) },',
    '{ id: "employees", label: "Employee Records", icon: Users, visible: [UserRole.SUPER_ADMIN, UserRole.HR_OFFICER].includes(role) },\n        { id: "activities", label: "Activities & Assignments", icon: Briefcase, visible: [UserRole.SUPER_ADMIN, UserRole.HR_OFFICER].includes(role) },'
  );
  
  if (!content.includes('Briefcase')) {
      content = content.replace(
        'import {', 
        'import { Briefcase,'
      );
  }
}

fs.writeFileSync('src/components/Sidebar.tsx', content);
