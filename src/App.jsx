import { Navigate, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import DashboardPage from "./pages/DashboardPage";
import DetailedViewPage from "./pages/DetailedViewPage";
import PlaceholderPage from "./pages/PlaceholderPage";

function App() {
  return (
    <Box sx={{ width: "80%", maxWidth: "1360px", margin: "0 auto", padding: "12px" }}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/detailed-view" element={<DetailedViewPage />} />
        <Route path="/market-conditions" element={<PlaceholderPage title="Market Conditions" body="This page is included to make the top navigation clickable." />} />
        <Route path="/coverage" element={<PlaceholderPage title="Coverage" body="This page is included to make the top navigation clickable." />} />
        <Route path="/alerts" element={<PlaceholderPage title="Alerts" body="Prototype alert listing page." />} />
        <Route path="/profile" element={<PlaceholderPage title="Profile" body="Prototype profile page." />} />
        <Route path="/analyst-notes" element={<PlaceholderPage title="Analyst Notes" body="Momentum weakening on lower timeframe. Updated: 6/12/2024 2:30pm." />} />
        <Route path="/watchlist" element={<PlaceholderPage title="Watchlist" body="FSLR added to watchlist (prototype behavior)." />} />
        <Route path="/create-alert" element={<PlaceholderPage title="Create Alert" body="Symbol: FSLR. Condition: Directional Bias Change." />} />
        <Route path="/help" element={<PlaceholderPage title="How to Read These Signals" body="[ Positive ] bullish / supportive. [ Neutral ] mixed / no conviction. [ Negative ] bearish / caution." />} />
        <Route path="/export" element={<PlaceholderPage title="Export" body="Prototype export action. No real export is performed." />} />
      </Routes>
    </Box>
  );
}

export default App;
