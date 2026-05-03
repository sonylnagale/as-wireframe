import { Box, Link as MuiLink, Button } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // Use the browser History API to determine if we can go back.
    // This is simpler and leverages the native stack maintained by the browser/Router.
    setCanGoBack(window.history.length > 1);
  }, [location]);

  const handleBack = () => {
    // Prefer router navigate(-1) which uses the history stack; fall back to dashboard.
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        borderBottom: "1px solid #d0d0d0",
        backgroundColor: "#f8f8f8",
        p: 0.5,
      }}
    >
      <Box sx={{ pl: 1 }}>
        <Button
          startIcon={<ArrowBackIosNewIcon />}
          onClick={handleBack}
          disabled={!canGoBack}
          size="small"
          sx={{ textTransform: "none", color: "#333333" }}
        >
          Back
        </Button>
      </Box>

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
        to="/"
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
        Log Out
      </MuiLink>
    </Box>
  );
}

export default TopNav;
