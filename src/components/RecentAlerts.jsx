import { Paper, List, ListItem, ListItemText, Typography } from "@mui/material";

function RecentAlerts() {
  const alerts = [
    { id: 1, text: "FSLR: Momentum weakening on 15m", time: "2:30pm" },
    { id: 2, text: "AAPL: Break above short-term resistance", time: "1:45pm" },
    { id: 3, text: "NVDA: Watch for reversal signal", time: "12:10pm" },
  ];

  return (
    <Paper sx={{ p: 1, mt: 2, border: "1px solid #d0d0d0" }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "#333333" }}>
        Recent Alerts
      </Typography>
      <List dense>
        {alerts.map((a) => (
          <ListItem key={a.id} sx={{ py: 0.5 }}>
            <ListItemText primary={a.text} secondary={a.time} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default RecentAlerts;
