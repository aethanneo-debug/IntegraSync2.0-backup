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
    
    // First, list all users to find one to archive
    const reqList = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/admin/users',
      method: 'GET',
      headers: {
        'Authorization': token
      }
    }, (resList) => {
      let dataList = '';
      resList.on('data', chunk => dataList += chunk);
      resList.on('end', () => {
        const users = JSON.parse(dataList).data;
        const targetUser = users.find(u => u.username !== 'admin');
        if (targetUser) {
          console.log("Found user to archive:", targetUser.username);
          
          const reqArchive = http.request({
            hostname: 'localhost',
            port: 3000,
            path: `/api/admin/users/${targetUser.id}`,
            method: 'PUT',
            headers: {
              'Authorization': token,
              'Content-Type': 'application/json'
            }
          }, (resArchive) => {
            let dataArchive = '';
            resArchive.on('data', chunk => dataArchive += chunk);
            resArchive.on('end', () => {
              console.log("Archive:", dataArchive);
            });
          });
          reqArchive.write(JSON.stringify({ status: "Archived" }));
          reqArchive.end();
        } else {
          console.log("No non-admin users found to archive.");
        }
      });
    });
    reqList.end();
  });
});
loginReq.write(JSON.stringify({ username: 'admin', password: 'password123' }));
loginReq.end();
