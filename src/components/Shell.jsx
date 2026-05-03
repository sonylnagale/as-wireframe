import { Link } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import TopNav from "./TopNav";

function Shell({ title, children }) {
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#333333" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: 600, color: "#ffffff" }}
          >
            <MuiLink
              component={Link}
              to={`/`}
              sx={{ color: "#fff", fontWeight: 600 }}
            >
              askSlim
            </MuiLink>
          </Typography>
          <Typography variant="body1" sx={{ color: "#ffffff" }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <TopNav />
      {children}
    </Box>
  );
}

export default Shell;
