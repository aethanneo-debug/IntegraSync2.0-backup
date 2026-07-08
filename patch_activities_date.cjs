const fs = require('fs');
let content = fs.readFileSync('src/components/ActivitiesView.tsx', 'utf8');

if (!content.includes('getLocalTodayString')) {
  content = content.replace(
    'import { apiCall } from "../utils";',
    'import { apiCall, getLocalTodayString } from "../utils";'
  );
  
  content = content.replace(
    'type="date" \n                    value={formData.dateScheduled}',
    'type="date" \n                    min={getLocalTodayString()}\n                    value={formData.dateScheduled}'
  );
  
  // just in case they were on the same line
  content = content.replace(
    'type="date" \n                    value={formData.dateScheduled}',
    'type="date" min={getLocalTodayString()} \n                    value={formData.dateScheduled}'
  );
  content = content.replace(
    /type="date"\s+value=\{formData\.dateScheduled\}/,
    'type="date"\n                    min={getLocalTodayString()}\n                    value={formData.dateScheduled}'
  );
  
  fs.writeFileSync('src/components/ActivitiesView.tsx', content);
}
