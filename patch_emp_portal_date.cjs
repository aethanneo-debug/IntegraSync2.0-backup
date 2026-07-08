const fs = require('fs');
let content = fs.readFileSync('src/components/EmployeePortalView.tsx', 'utf8');

content = content.replace(
  'type="date"\n                        required\n                        value={resubmitDates.startDate}',
  'type="date"\n                        required\n                        min={getLocalTodayString()}\n                        value={resubmitDates.startDate}'
);

content = content.replace(
  'type="date"\n                        required\n                        value={resubmitDates.endDate}',
  'type="date"\n                        required\n                        min={resubmitDates.startDate || getLocalTodayString()}\n                        value={resubmitDates.endDate}'
);

content = content.replace(
  'type="date"\n                      required\n                      value={resubmitDates.dateNeeded}',
  'type="date"\n                      required\n                      min={getLocalTodayString()}\n                      value={resubmitDates.dateNeeded}'
);

content = content.replace(
  'type="date"\n                      required\n                      value={resubmitDates.meetingDate}',
  'type="date"\n                      required\n                      min={getLocalTodayString()}\n                      value={resubmitDates.meetingDate}'
);

fs.writeFileSync('src/components/EmployeePortalView.tsx', content);
