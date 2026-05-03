import { Link } from "react-router-dom";
import { Box, Paper, Typography, Link as MuiLink } from "@mui/material";
import Shell from "../components/Shell";

function PlaceholderPage({ title, body }) {
  return (
    <Shell title={title}>
      <Box sx={{ p: 2 }}>
        <Paper sx={{ p: 2, border: "1px solid #d0d0d0" }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#333333" }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "#666666" }}>
            {body}
          </Typography>
          <MuiLink component={Link} to="/dashboard" underline="hover" sx={{ color: "#333333", fontWeight: 500 }}>
            Back to Dashboard
          </MuiLink>
        </Paper>
      </Box>
    </Shell>
  );
}

export default PlaceholderPage;
