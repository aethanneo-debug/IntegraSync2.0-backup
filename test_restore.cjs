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
    
    // Restore User
    const reqRestore = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/admin/users/u-1783479372980/restore',
      method: 'POST',
      headers: {
        'Authorization': token
      }
    }, (resRestore) => {
      let dataRestore = '';
      resRestore.on('data', chunk => dataRestore += chunk);
      resRestore.on('end', () => {
        console.log("Restore:", dataRestore);
      });
    });
    reqRestore.end();
  });
});
loginReq.write(JSON.stringify({ username: 'admin', password: 'password123' }));
loginReq.end();
