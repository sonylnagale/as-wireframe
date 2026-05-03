import { Paper, Box, Typography } from "@mui/material";

function MarketSummary() {
  const items = [
    { symbol: "SPY", value: "$531.77", change: "+0.2%" },
    { symbol: "QQQ", value: "$457.89", change: "+0.9%" },
    { symbol: "VIX", value: "12.3", change: "-0.8%" },
    { symbol: "DXY", value: "102.45", change: "+0.1%" },
  ];

  return (
    <Paper sx={{ p: 1, mb: 2, border: "1px solid #d0d0d0" }}>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, gap: 1 }}>
        {items.map((it) => (
          <Box key={it.symbol} sx={{ p: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#333333" }}>
              {it.symbol}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#222222" }}>
              {it.value}
            </Typography>
            <Typography variant="caption" sx={{ color: "#666666" }}>
              {it.change}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

export default MarketSummary;
