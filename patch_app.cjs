const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add import
if(!content.includes('ActivitiesView')) {
  content = content.replace(
    'import EmployeesView from "./components/EmployeesView";',
    'import EmployeesView from "./components/EmployeesView";\nimport ActivitiesView from "./components/ActivitiesView";'
  );
}

// Add route case
const caseString = `
      case "activities":
        return <ActivitiesView user={user} onRefresh={triggerRefresh} />;`;
        
if(!content.includes('case "activities":')) {
  content = content.replace(
    '      case "employees":',
    '      case "activities":\n        return <ActivitiesView user={user} onRefresh={triggerRefresh} />;\n      case "employees":'
  );
}

fs.writeFileSync('src/App.tsx', content);
