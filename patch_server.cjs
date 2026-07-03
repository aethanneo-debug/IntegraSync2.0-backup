const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const replacement = `app.put("/api/liquidation-submissions/:id/resubmit", authenticateToken, (req: any, res) => {`;

const newCode = `app.put("/api/requests/:id/resubmit", authenticateToken, (req: any, res) => {
  const { id } = req.params;
  const { dateRequested, startDate, endDate, dateNeeded, meetingDate } = req.body;

  const request = db.requests.find((r: any) => r.id === id);
  if (!request) {
    return res.status(404).json({ status: "error", message: "Personnel Request not found" });
  }

  if (request.employeeId !== req.user.employeeId && req.user.role !== UserRole.SUPER_ADMIN) {
    return res.status(403).json({ status: "error", message: "Forbidden: You cannot resubmit this request." });
  }
  
  if (dateRequested) request.dateRequested = dateRequested;
  
  // Depending on request type update relevant date fields
  if (request.requestType === RequestType.LEAVE) {
    const leaveReq = request as any;
    if (startDate) leaveReq.startDate = startDate;
    if (endDate) leaveReq.endDate = endDate;
  } else if (request.requestType === RequestType.VEHICLE) {
    const vehicleReq = request as any;
    if (dateNeeded) vehicleReq.dateNeeded = dateNeeded;
  } else if (request.requestType === RequestType.ZOOM) {
    const zoomReq = request as any;
    if (meetingDate) zoomReq.meetingDate = meetingDate;
  }
  
  request.status = request.requestType === RequestType.VEHICLE ? RequestStatus.ENDORSED_TO_CHIEF : RequestStatus.PENDING;
  request.remarks = "Resubmitted with modified dates.";

  logEvent(req.user.id, req.user.username, req.user.role, "Resubmit Request", \`Resubmitted personnel request: \${id}\`);
  saveDB();
  res.json({ status: "success", data: request });
});

app.put("/api/liquidation-submissions/:id/resubmit", authenticateToken, (req: any, res) => {`;

content = content.replace(replacement, newCode);
fs.writeFileSync('server.ts', content);
