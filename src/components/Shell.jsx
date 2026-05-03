import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import TopNav from "./TopNav";

function Shell({ title, children, showNav = true }) {
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#333333" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600, color: "#ffffff" }}>
            askSlim
          </Typography>
          <Typography variant="body1" sx={{ color: "#ffffff" }}>{title}</Typography>
        </Toolbar>
      </AppBar>
      {showNav ? <TopNav /> : null}
      {children}
    </Box>
  );
}

export default Shell;
