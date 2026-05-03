import { Paper, Box, Typography, List, ListItem, ListItemText } from "@mui/material";

function TopGainersLosers() {
  const gainers = [
    { symbol: "NVDA", pct: "+4.2%" },
    { symbol: "AAPL", pct: "+1.8%" },
    { symbol: "QQQ", pct: "+1.1%" },
  ];
  const losers = [
    { symbol: "TSLA", pct: "-2.4%" },
    { symbol: "AMZN", pct: "-1.1%" },
    { symbol: "MSFT", pct: "-0.4%" },
  ];

  return (
    <Paper sx={{ p: 1, mt: 2, border: "1px solid #d0d0d0" }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "#333333" }}>
        Movers
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" sx={{ color: "#666666" }}>Gainers</Typography>
          <List dense>
            {gainers.map((g) => (
              <ListItem key={g.symbol} sx={{ py: 0.5 }}>
                <ListItemText
                  primary={<Typography sx={{ fontWeight: 700 }}>{g.symbol}</Typography>}
                  secondary={<Typography sx={{ color: "#666666" }}>{g.pct}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" sx={{ color: "#666666" }}>Losers</Typography>
          <List dense>
            {losers.map((l) => (
              <ListItem key={l.symbol} sx={{ py: 0.5 }}>
                <ListItemText
                  primary={<Typography sx={{ fontWeight: 700 }}>{l.symbol}</Typography>}
                  secondary={<Typography sx={{ color: "#666666" }}>{l.pct}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Paper>
  );
}

export default TopGainersLosers;
