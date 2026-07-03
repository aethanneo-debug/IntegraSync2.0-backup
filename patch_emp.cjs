const fs = require('fs');
let content = fs.readFileSync('src/components/EmployeePortalView.tsx', 'utf8');

content = content.replace(
  `const [resubmittingItem, setResubmittingItem] = useState<any | null>(null);`,
  `const [resubmittingItem, setResubmittingItem] = useState<any | null>(null);
  const [resubmitRequest, setResubmitRequest] = useState<any | null>(null);
  const [resubmitDates, setResubmitDates] = useState({ dateRequested: "", startDate: "", endDate: "", dateNeeded: "", meetingDate: "" });`
);

content = content.replace(
  `  // Handle Liquidation submission`,
  `  async function handleRequestResubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!resubmitRequest) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const payload: any = {
        dateRequested: resubmitDates.dateRequested
      };
      
      if (resubmitRequest.requestType === RequestType.LEAVE) {
        payload.startDate = resubmitDates.startDate;
        payload.endDate = resubmitDates.endDate;
      } else if (resubmitRequest.requestType === RequestType.VEHICLE) {
        payload.dateNeeded = resubmitDates.dateNeeded;
      } else if (resubmitRequest.requestType === RequestType.ZOOM) {
        payload.meetingDate = resubmitDates.meetingDate;
      }
      
      const res = await apiCall(\`/api/requests/\${resubmitRequest.id}/resubmit\`, {
        method: "PUT",
        body: JSON.stringify(payload)
      });
      if (res.status === "success") {
        setSuccess("Personnel request successfully resubmitted.");
        setResubmitRequest(null);
        fetchPortalData();
        onRefresh();
      }
    } catch (err: any) {
      setError(err.message || "Failed to resubmit request.");
    } finally {
      setLoading(false);
    }
  }

  // Handle Liquidation submission`
);

fs.writeFileSync('src/components/EmployeePortalView.tsx', content);
