import { Link } from "react-router-dom";
import { Paper, Box, Typography, Link as MuiLink } from "@mui/material";

function MarketHeatmap() {
  const tiles = [
    { symbol: "AAPL", pct: 1.2 },
    { symbol: "MSFT", pct: -0.4 },
    { symbol: "NVDA", pct: 2.8 },
    { symbol: "AMZN", pct: -1.1 },
    { symbol: "GOOGL", pct: 0.6 },
    { symbol: "TSLA", pct: -0.9 },
    { symbol: "FSLR", pct: 0.4 },
    { symbol: "SPY", pct: 0.2 },
    { symbol: "QQQ", pct: 0.9 },
  ];

  const tileColor = (pct) => {
    const intensity = Math.min(220, Math.round(220 - Math.abs(pct) * 12));
    const bg = `rgb(${intensity},${intensity},${intensity})`;
    const text = intensity > 160 ? "#222222" : "#ffffff";
    return { bg, text };
  };

  return (
    <Paper sx={{ p: 1, mt: 2, border: "1px solid #d0d0d0" }}>
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 700, mb: 1, color: "#333333" }}
      >
        Market Heatmap
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {tiles.map((t) => {
          const c = tileColor(t.pct);
          return (
            <MuiLink
              key={t.symbol}
              component={Link}
              to={`/detailed-view?symbol=${t.symbol}`}
              sx={{ color: "#333333", fontWeight: 600 }}
            >
              <Box
                sx={{
                  width: 110,
                  height: 56,
                  p: 0.75,
                  backgroundColor: c.bg,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: 1,
                }}
              >
                <Typography
                  sx={{ fontWeight: 700, color: c.text, fontSize: 13 }}
                >
                  {t.symbol}
                </Typography>
                <Typography sx={{ color: c.text, fontSize: 11 }}>
                  {t.pct > 0 ? `+${t.pct}%` : `${t.pct}%`}
                </Typography>
              </Box>
            </MuiLink>
          );
        })}
      </Box>
    </Paper>
  );
}

export default MarketHeatmap;
