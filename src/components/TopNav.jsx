import { Box, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

function TopNav() {
  return (
    <Box
      sx={{
        display: "flex",
        borderBottom: "1px solid #d0d0d0",
        backgroundColor: "#f8f8f8",
      }}
    >
      <MuiLink
        component={Link}
        to="/dashboard"
        sx={{
          flex: 1,
          p: 1,
          textAlign: "center",
          textDecoration: "none",
          color: "#333333",
          fontWeight: 500,
          "&:hover": { backgroundColor: "#eeeeee" },
        }}
      >
        Dashboard
      </MuiLink>
      <MuiLink
        component={Link}
        to="/market-conditions"
        sx={{
          flex: 1,
          p: 1,
          textAlign: "center",
          textDecoration: "none",
          color: "#333333",
          fontWeight: 500,
          "&:hover": { backgroundColor: "#eeeeee" },
        }}
      >
        Market Conditions
      </MuiLink>
      <MuiLink
        component={Link}
        to="/coverage"
        sx={{
          flex: 1,
          p: 1,
          textAlign: "center",
          textDecoration: "none",
          color: "#333333",
          fontWeight: 500,
          "&:hover": { backgroundColor: "#eeeeee" },
        }}
      >
        Coverage
      </MuiLink>

      <MuiLink
        component={Link}
        to="/profile"
        sx={{
          flex: 1,
          p: 1,
          textAlign: "center",
          textDecoration: "none",
          color: "#333333",
          fontWeight: 500,
          "&:hover": { backgroundColor: "#eeeeee" },
        }}
      >
        Profile
      </MuiLink>
    </Box>
  );
}

export default TopNav;
