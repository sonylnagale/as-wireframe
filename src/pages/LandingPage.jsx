import { Box, Typography } from "@mui/material";
import LoginBox from "../components/LoginBox";

function LandingPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h3" sx={{ fontWeight: 700, color: "#333333" }}>
          aS Platform
        </Typography>
      </Box>

      <LoginBox />
    </Box>
  );
}

export default LandingPage;
