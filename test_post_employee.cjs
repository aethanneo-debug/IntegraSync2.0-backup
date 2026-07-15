const http = require('http');

const data = JSON.stringify({
  employeeId: "EMP-TEST-001",
  fullName: "Test User",
  surname: "Test",
  firstName: "User",
  position: "Tester",
  salary: "60000",
  division: "Testing Division"
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/employees',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
    'Authorization': 'Bearer test-token' // Auth logic doesn't strictly validate token if mock? Wait, let's see authentication in server.ts
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log('POST Response:', body));
});

req.write(data);
req.end();
