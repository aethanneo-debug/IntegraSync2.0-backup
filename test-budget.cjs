async function test() {
  const token = 'mock-token-super_admin';
  try {
    const res = await fetch('http://localhost:3000/api/finance/budget-requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        department: "HR",
        amountRequested: 10000,
        requestType: "Augmentation",
        purpose: "Test"
      })
    });
    console.log("Status:", res.status);
    console.log("Body:", await res.text());
  } catch(e) {
    console.error(e);
  }
}
test();
