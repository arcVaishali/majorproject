import React, { useState } from "react";
import { Button, TextField, Box, Paper, Grid, Typography } from "@mui/material";
import Web3 from "web3";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);

  const handleLogin = async () => {
    // Validate form fields
    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }

    // Prepare the request payload
    const loginData = {
      email,
      password,
    };

    try {
      // Mock API call to authenticate user
      const response = await fetch("https://your-backend-api.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // Assuming the response contains a token or user info
        localStorage.setItem("authToken", data.token); // Store token in localStorage
        alert("Login successful!");
        // Redirect or update the state to show the logged-in view
        // Example: window.location.href = "/dashboard"; // Navigate to the dashboard
      } else {
        // If the login fails, display the error message
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3Instance.eth.getAccounts();
        setWeb3(web3Instance);
        setAccount(accounts[0]);
        alert("Wallet Connected: " + accounts[0]);
      } catch (error) {
        console.error("Failed to connect wallet", error);
        alert("Please install MetaMask or another Web3 wallet.");
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Paper
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Login to Your Account
        </Typography>

        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Button
            variant="outlined"
            fullWidth
            onClick={connectWallet}
            sx={{
              borderColor: "#3f51b5",
              color: "#3f51b5",
              "&:hover": { borderColor: "#303f9f" },
            }}
          >
            Connect Wallet
          </Button>
          {account && (
            <Typography variant="body2" sx={{ marginTop: 2, color: "#757575" }}>
              Connected as: {account}
            </Typography>
          )}
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
              sx={{
                backgroundColor: "#3f51b5",
                "&:hover": { backgroundColor: "#303f9f" },
              }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          Don't have an account? <a href="#">Sign Up</a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;
