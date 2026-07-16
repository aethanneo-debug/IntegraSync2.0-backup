const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// The best way is to use regex or split to add the default PS/MOOE/CO fields to the budget items.
function addBreakdowns(match) {
  // Extract budgetAllocation
  let baMatch = match.match(/budgetAllocation:\s*([\d\.]+)/);
  let ba = baMatch ? parseFloat(baMatch[1]) : 0;
  
  let p = Math.floor(ba * 0.5);
  let m = Math.floor(ba * 0.3);
  let c = ba - p - m;

  let uMatch = match.match(/budgetUtilized:\s*([\d\.]+)/);
  let ut = uMatch ? parseFloat(uMatch[1]) : 0;
  
  let up = Math.floor(ut * 0.5);
  let um = Math.floor(ut * 0.3);
  let uc = ut - up - um;

  return match.replace('}', `, allocatedPS: ${p}, utilizedPS: ${up}, remainingPS: ${p - up}, allocatedMOOE: ${m}, utilizedMOOE: ${um}, remainingMOOE: ${m - um}, allocatedCO: ${c}, utilizedCO: ${uc}, remainingCO: ${c - uc} }`);
}

code = code.replace(/\{ id: "b-\d(?:-old)?".*?\}/g, addBreakdowns);

fs.writeFileSync('server.ts', code);
console.log("Server.ts budgetAllocations patched.");
