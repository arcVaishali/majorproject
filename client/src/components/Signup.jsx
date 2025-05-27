import React, { useState } from "react";
import Web3 from "web3";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  Link,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const bgUrl =
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80';

const RegistrationPage = () => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [userType, setUserType] = useState("individual");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    orgName: "",
    regNumber: "",
    address: "",
  });

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

   const handleSignup = async () => {
    // Validate form fields
    if ( !form.email || !form.password || !form.fullName )  {
      alert("Please fill in all details.");
      return;
    }

    // Prepare the request payload
    // const loginData = {
    //   form.email,
    //   from.password,
    // };

    // try {
    //   // Mock API call to authenticate user
    //   const response = await fetch("https://your-backend-api.com/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(loginData),
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     // Assuming the response contains a token or user info
    //     localStorage.setItem("authToken", data.token); // Store token in localStorage
    //     alert("Login successful!");
    //     // Redirect or update the state to show the logged-in view
    //     // Example: window.location.href = "/dashboard"; // Navigate to the dashboard
    //   } else {
    //     // If the login fails, display the error message
    //     alert(`Login failed: ${data.message}`);
    //   }
    // } catch (error) {
    //   console.error("Error during login:", error);
    //   alert("An error occurred. Please try again.");
    // }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background: `linear-gradient(rgba(0,0,0,0.6),rgba(0,128,0,0.3)), url(${bgUrl}) center/cover no-repeat fixed`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            padding: 4,
            borderRadius: 4,
            boxShadow: 3,
            background: "rgba(255,255,255,0.6)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#2E7D32" }}
          >
            GreenXchange Registration
          </Typography>
          <Typography
            variant="body1"
            align="center"
            gutterBottom
            sx={{ color: "#4CAF50" }}
          >
            Join the movement for a sustainable future!
          </Typography>

          <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>User Type</InputLabel>
                  <Select
                    value={userType}
                    label="User Type"
                    onChange={e => setUserType(e.target.value)}
                  >
                    <MenuItem value="individual">Individual</MenuItem>
                    <MenuItem value="company">Company</MenuItem>
                    <MenuItem value="organization">Organization</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={userType === "individual" ? "Full Name" : userType === "company" ? "Company Name" : "Organization Name"}
                  name="fullName"
                  variant="outlined"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                />
              </Grid>
              {(userType === "company" || userType === "organization") && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Registration Number"
                      name="regNumber"
                      variant="outlined"
                      required
                      value={form.regNumber}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Registered Address"
                      name="address"
                      variant="outlined"
                      required
                      value={form.address}
                      onChange={handleChange}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  variant="outlined"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  variant="outlined"
                  required
                  value={form.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  variant="outlined"
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Button
              variant="outlined"
              fullWidth
              onClick={connectWallet}
              sx={{
                borderColor: "secondary",
                color: "#3f51b5",
                "&:hover": { borderColor: "primary" },
                marginY: "5px"
              }}
            >
              Connect Wallet
            </Button>
            {account && (
              <Typography variant="body2" sx={{ marginTop: 2, color: "#757575" }}>
                Connected as: {account}
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, py: 1.5, fontWeight: "bold" }}
              onClick = {handleSignup}
            >
              <Link href="/login" color="inherit" underline="hover">
                Register
              </Link>
            </Button>

            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2, color: "#616161" }}
            >
              Already have an account?{" "}
              <Link href="/login" underline="hover" color="primary">
                Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegistrationPage;