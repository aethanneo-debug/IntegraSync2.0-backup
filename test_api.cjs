const http = require('http');

const data = JSON.stringify({
  department: "New Test Division",
  allocatedPS: 1000,
  allocatedMOOE: 1000,
  allocatedCO: 1000
});

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/finance/budgets',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer test-token-super-admin'
  }
}, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log('Response:', body));
});

req.write(data);
req.end();
