const fs = require('fs');
let content = fs.readFileSync('src/components/EmployeePortalView.tsx', 'utf8');

const target = `                    {activities.map(a => (
                      <option key={a.id} value={a.id}>{a.activityNo} - {a.title}</option>
                    ))}`;

const replacement = `                    {activities
                      .filter(a => {
                        const isLinked = submissions.some(sub => sub.activityId === a.id);
                        if (resubmittingItem && resubmittingItem.activityId === a.id) return true;
                        return !isLinked;
                      })
                      .map(a => (
                      <option key={a.id} value={a.id}>{a.activityNo} - {a.title}</option>
                    ))}`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('src/components/EmployeePortalView.tsx', content);
    console.log("Replaced activities dropdown successfully.");
} else {
    console.log("Target not found!");
}
