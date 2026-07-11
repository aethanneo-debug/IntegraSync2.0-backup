const fs = require('fs');
let content = fs.readFileSync('src/components/AdminUnifiedRequests.tsx', 'utf8');

// For Personnel Request
content = content.replace(
  /_requester: r\.employeeName,\s*_amount: null,\s*_sequence: seq\+\+/g,
  `_requester: r.employeeName,
            _division: getDivision(r.employeeId, null),
            _amount: null,
            _sequence: seq++`
);

// For Liquidation
content = content.replace(
  /_requester: s\.employeeName,\s*_amount: s\.totalSpent,\s*_sequence: seq\+\+/g,
  `_requester: s.employeeName,
            _division: getDivision(s.employeeId, null),
            _amount: s.totalSpent,
            _sequence: seq++`
);

// For Budget Request
content = content.replace(
  /_requester: b\.department,\s*_amount: b\.amountRequested,\s*_sequence: seq\+\+/g,
  `_requester: b.department,
            _division: b.department,
            _amount: b.amountRequested,
            _sequence: seq++`
);

fs.writeFileSync('src/components/AdminUnifiedRequests.tsx', content);
