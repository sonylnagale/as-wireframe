import { Link } from "react-router-dom";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Typography,
  Button,
  Link as MuiLink,
} from "@mui/material";
import Shell from "../components/Shell";
import AssetSparkline from "../components/AssetSparkline";

const assets = [
  {
    symbol: "FSLR",
    price: "$286.40",
    change: "+1.4%",
    bias: "Neutral",
    signal: "Mixed confirmation",
    trend: [28, 24, 26, 18, 22, 14, 16, 10],
  },
  {
    symbol: "AAPL",
    price: "$198.52",
    change: "+0.6%",
    bias: "Positive",
    signal: "Momentum building",
    trend: [26, 20, 22, 18, 14, 12, 10, 8],
  },
  {
    symbol: "NVDA",
    price: "$948.10",
    change: "-0.8%",
    bias: "Negative",
    signal: "Short-term pressure",
    trend: [10, 14, 12, 18, 20, 24, 26, 30],
  },
  {
    symbol: "SPY",
    price: "$531.77",
    change: "+0.2%",
    bias: "Neutral",
    signal: "Range-bound",
    trend: [18, 18, 16, 17, 15, 14, 14, 13],
  },
  {
    symbol: "QQQ",
    price: "$457.89",
    change: "+0.9%",
    bias: "Positive",
    signal: "Broad support",
    trend: [30, 26, 24, 20, 16, 14, 12, 10],
  },
];

function DashboardPage() {
  return (
    <Shell title="Market Conditions Monitor">
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Dashboard
            <Paper sx={{ p: 1, backgroundColor: "#f0f0f0", fontSize: "12px" }}>
              <Box>Trader Type: Near Term | D | 2hr | 15min</Box>
            </Paper>
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Paper sx={{ overflow: "auto", border: "1px solid #d0d0d0" }}>
              <Table size="small">
                <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
                  <TableRow sx={{ borderBottom: "1px solid #d0d0d0" }}>
                    <TableCell sx={{ fontWeight: 600, color: "#333333" }}>
                      Asset
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#333333" }}>
                      Price
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#333333" }}>
                      Change
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#333333" }}>
                      Bias
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#333333" }}>
                      Intraday Chart
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#333333" }}>
                      Signal
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assets.map((asset) => (
                    <TableRow
                      key={asset.symbol}
                      hover
                      sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}
                    >
                      <TableCell>
                        <MuiLink
                          component={Link}
                          to={`/detailed-view?symbol=${asset.symbol}`}
                          underline="hover"
                          sx={{ color: "#333333", fontWeight: 600 }}
                        >
                          {asset.symbol}
                        </MuiLink>
                      </TableCell>
                      <TableCell sx={{ color: "#666666" }}>
                        {asset.price}
                      </TableCell>
                      <TableCell sx={{ color: "#666666" }}>
                        {asset.change}
                      </TableCell>
                      <TableCell sx={{ color: "#666666" }}>
                        {asset.bias}
                      </TableCell>
                      <TableCell sx={{ width: "180px", p: 0.5 }}>
                        <MuiLink
                          component={Link}
                          to={`/detailed-view?symbol=${asset.symbol}`}
                          underline="none"
                        >
                          <AssetSparkline
                            label={`${asset.symbol} intraday trend`}
                            values={asset.trend}
                          />
                        </MuiLink>
                      </TableCell>
                      <TableCell sx={{ color: "#666666" }}>
                        {asset.signal}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>

          <Grid item xs={12} md={3}>
            <Paper
              sx={{
                p: 2,
                mb: 2,
                maxHeight: "600px",
                overflow: "auto",
                border: "1px solid #d0d0d0",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, mb: 1, color: "#333333" }}
              >
                Changelog
              </Typography>
              <Box
                sx={{
                  fontSize: "12px",
                  color: "#666666",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Box>
                  FSLR ↓ (Neutral) 6/12/2024 2:30pm • Fifteen Minute - Slim
                  Ribbon
                </Box>
                <Box>
                  FSLR ↓ (Negative) 6/12/2024 2:24pm • Three Minute - Slim
                  Ribbon
                </Box>
                <Box>
                  FSLR ↓ (Negative) 6/12/2024 2:24pm • Three Minute - Reversal
                  Scout
                </Box>
                <Box>
                  FSLR ↑ (Neutral) 6/12/2024 2:21pm • Three Minute - Slim Ribbon
                </Box>
                <Box>
                  FSLR ↑ (Positive) 6/12/2024 2:18pm • Three Minute - Reversal
                  Scout
                </Box>
                <Box>
                  FSLR ↓ (Negative) 6/12/2024 2:00pm • Three Minute - Slim
                  Ribbon
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Shell>
  );
}

export default DashboardPage;
