const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const tgt = `  // If NOT Super Admin, they must provide a valid approved request ID to change/create allocation totals
  if (req.user.role !== UserRole.SUPER_ADMIN) {
    if (!approvedRequestId) {
      return res.status(403).json({ 
        status: "error", 
        message: "Direct budget allocation adjustments that alter approved totals require Chief concurrence. Please submit a Budget Request first, or provide an Approved Request ID." 
      });
    }
    const reqItem = db.budgetRequests?.find(r => r.id === approvedRequestId && r.status === "Approved");
    if (!reqItem) {
      return res.status(403).json({ 
        status: "error", 
        message: "The provided Request ID is either invalid or not yet approved by the Division Chief." 
      });
    }
  }`;

const rep = `  // Allow Budget Officer to create the initial budget allocation based on the GAA/WFP offline documents.
  // We only require approvedRequestId if this is a subsequent supplemental creation, 
  // but since we only allow one allocation per department per FY (see 'existing' check below),
  // this is always the initial creation. So we skip the approvedRequestId requirement here.`;

code = code.replace(tgt, rep);
fs.writeFileSync('server.ts', code);
