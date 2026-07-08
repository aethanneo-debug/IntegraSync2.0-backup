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
    
    // Create User
    const reqCreate = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/admin/users',
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    }, (resCreate) => {
      let dataCreate = '';
      resCreate.on('data', chunk => dataCreate += chunk);
      resCreate.on('end', () => {
        console.log("Create:", dataCreate);
        const newUser = JSON.parse(dataCreate).data;
        
        // Deactivate User
        const reqDeactivate = http.request({
          hostname: 'localhost',
          port: 3000,
          path: '/api/admin/users/' + newUser.id,
          method: 'PUT',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        }, (resDeactivate) => {
          let dataDeactivate = '';
          resDeactivate.on('data', chunk => dataDeactivate += chunk);
          resDeactivate.on('end', () => {
            console.log("Deactivate:", dataDeactivate);
            
            // Archive User
            const reqArchive = http.request({
              hostname: 'localhost',
              port: 3000,
              path: '/api/admin/users/' + newUser.id + '/archive',
              method: 'POST',
              headers: {
                'Authorization': token
              }
            }, (resArchive) => {
              let dataArchive = '';
              resArchive.on('data', chunk => dataArchive += chunk);
              resArchive.on('end', () => {
                console.log("Archive:", dataArchive);
              });
            });
            reqArchive.end();
          });
        });
        reqDeactivate.write(JSON.stringify({
          fullName: "Test User",
          email: "test@hsac.gov.ph",
          username: "test",
          role: "Employee / Personnel",
          status: "Deactivated"
        }));
        reqDeactivate.end();
      });
    });
    reqCreate.write(JSON.stringify({
      fullName: "Test User",
      email: "test@hsac.gov.ph",
      username: "test",
      role: "Employee / Personnel",
      status: "Active"
    }));
    reqCreate.end();
  });
});
loginReq.write(JSON.stringify({ username: 'admin', password: 'password123' }));
loginReq.end();
