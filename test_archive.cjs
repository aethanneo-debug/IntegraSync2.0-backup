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
    
    // First, change status to Deactivated
    const req0 = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/admin/users/u-emp',
      method: 'PUT',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    }, (res0) => {
      let data0 = '';
      res0.on('data', chunk => data0 += chunk);
      res0.on('end', () => {
        console.log("Deactivate:", data0);
        
        // Then archive
        const req = http.request({
          hostname: 'localhost',
          port: 3000,
          path: '/api/admin/users/u-emp/archive',
          method: 'POST',
          headers: {
            'Authorization': token
          }
        }, (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            console.log("Archive:", data);
          });
        });
        req.end();
      });
    });
    req0.write(JSON.stringify({
      status: "Deactivated"
    }));
    req0.end();
  });
});
loginReq.write(JSON.stringify({ username: 'admin', password: 'password123' }));
loginReq.end();
