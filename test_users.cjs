const http = require('http');

const loginReq = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}, (loginRes) => {
  let loginData = '';
  loginRes.on('data', chunk => loginData += chunk);
  loginRes.on('end', () => {
    const token = JSON.parse(loginData).token;
    
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/admin/users',
      method: 'GET',
      headers: {
        'Authorization': token
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const users = JSON.parse(data).data;
        console.log(users.map(u => ({ id: u.id, username: u.username, status: u.status })));
      });
    });
    req.end();
  });
});

loginReq.write(JSON.stringify({ username: 'admin', password: 'password123' }));
loginReq.end();
