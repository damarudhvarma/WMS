import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (!credentials.email || !credentials.password) {
      alert("Both email and password are required!");
      return;
    }
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0D6B4F",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: "center",
          borderRadius: 2,
          minWidth: 320,
        }}
      >
        <Typography variant="h5" gutterBottom>
          WMS
        </Typography>

        <Typography
          variant="body1"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            fontWeight: "bold",
            mb: 2,
          }}
        >
          <LocalShippingIcon /> Truck Driver
        </Typography>

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{
            backgroundColor: "#0D6B4F",
            "&:hover": { backgroundColor: "#0A573D" },
          }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}

export default Login;
