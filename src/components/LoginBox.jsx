import { useState } from "react";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function LoginBox() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Any input is accepted — navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <Paper sx={{ p: 3, width: 360, maxWidth: "90%", boxShadow: 3 }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: "#333333" }}>
          Sign in
        </Typography>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="dense"
          size="small"
          autoComplete="username"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="dense"
          size="small"
          autoComplete="current-password"
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="contained"
            type="submit"
            sx={{ backgroundColor: "#333333", "&:hover": { backgroundColor: "#555555" } }}
          >
            Sign in
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default LoginBox;
