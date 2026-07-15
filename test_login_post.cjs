const http = require('http');

const data = JSON.stringify({ username: "admin", password: "password123" });
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    const json = JSON.parse(body);
    const token = json.data?.token.replace('Bearer ', '');
    
    // Now POST employee
    const empData = JSON.stringify({
      employeeId: "EMP-TEST-003",
      fullName: "Test User",
      surname: "Test",
      firstName: "User",
      position: "Tester",
      salary: "60000",
      division: "Testing Division"
    });
    const options2 = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/employees',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': empData.length,
        'Authorization': 'Bearer ' + token
      }
    };
    const req2 = http.request(options2, res2 => {
        let b2 = '';
        res2.on('data', d => b2 += d);
        res2.on('end', () => {
             console.log("POST EMP:", b2);
             
             // Now GET PDS profile
             const options3 = {
                 hostname: 'localhost',
                 port: 3000,
                 path: '/api/employees/EMP-TEST-003/pds-profile',
                 method: 'GET',
                 headers: {
                     'Authorization': 'Bearer ' + token
                 }
             };
             const req3 = http.request(options3, res3 => {
                 let b3 = '';
                 res3.on('data', d => b3 += d);
                 res3.on('end', () => console.log("GET PDS:", b3));
             });
             req3.end();
        });
    });
    req2.write(empData);
    req2.end();
  });
});

req.write(data);
req.end();
