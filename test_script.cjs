const submissions = [
  { id: '1', submissionNo: 'SUB-001', status: 'Completed' },
  { id: '2', submissionNo: 'SUB-002', status: 'Verified & Forwarded' },
];
const budgetLinks = [
  { liquidationNo: 'SUB-001' }
];

console.log(submissions.filter(s => s.status === "Completed" && !budgetLinks.some(bl => bl.liquidationNo === s.submissionNo)));
