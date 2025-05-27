import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  Divider,
  Avatar,
  Chip,
} from "@mui/material";
import { styled } from "@mui/system";
import Web3 from "web3";

const bgUrl =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  boxShadow: theme.shadows[4],
  background: "rgba(255,255,255,0.92)",
  backdropFilter: "blur(8px)",
}));

const Buy = () => {
  const [tokens, setTokens] = useState("");
  const [pricePerToken] = useState(0.001); // ETH per token
  const [totalCost, setTotalCost] = useState(0);
  const [account, setAccount] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTokenChange = (event) => {
    const value = event.target.value;
    setTokens(value);
    setTotalCost(value * pricePerToken);
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
        setStatus(`Wallet Connected: ${accounts[0]}`);
      } catch (error) {
        setStatus("Wallet connection failed.");
      }
    } else {
      setStatus("Please install MetaMask!");
    }
  };

  const handlePurchase = async () => {
    if (tokens > 0 && account) {
      setLoading(true);
      setStatus("Processing transaction...");
      setTimeout(() => {
        setLoading(false);
        setStatus(`You have successfully purchased ${tokens} Green Credit Tokens!`);
      }, 2000);
    } else if (!account) {
      setStatus("Please connect your wallet first.");
    } else {
      setStatus("Please enter a valid number of tokens.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(rgba(0,0,0,0.7),rgba(0,128,0,0.5)), url(${bgUrl}) center/cover no-repeat fixed`,
        display: "flex",
        alignItems: "center",
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <StyledPaper>
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Avatar
              src="https://cdn-icons-png.flaticon.com/512/2909/2909765.png"
              sx={{ width: 80, height: 80, mb: 2, bgcolor: "#e8f5e9" }}
              variant="rounded"
            />
            <Typography variant="h4" fontWeight="bold" color="#2E7D32" gutterBottom>
              Buy Green Credit Tokens
            </Typography>
            <Chip label="Eco-Friendly" color="success" sx={{ mb: 1 }} />
            <Typography variant="body2" color="textSecondary" align="center">
              Support sustainability by purchasing Green Credits. Each token represents a verified green action!
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Number of Tokens"
                  type="number"
                  variant="outlined"
                  value={tokens}
                  onChange={handleTokenChange}
                  required
                  inputProps={{ min: 1 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    color: "#1B5E20",
                    fontWeight: "bold",
                    mt: 2,
                  }}
                >
                  Total Cost: {tokens > 0 ? totalCost : 0} ETH
                </Typography>
              </Grid>
            </Grid>

            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 3, mb: 2, fontWeight: "bold" }}
              onClick={connectWallet}
              disabled={!!account}
            >
              {account
                ? `Wallet: ${account.slice(0, 6)}...${account.slice(-4)}`
                : "Connect Wallet"}
            </Button>

            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ py: 1.5, fontWeight: "bold" }}
              onClick={handlePurchase}
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm Purchase"}
            </Button>
          </Box>

          {status && (
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 3, color: status.includes("successfully") ? "green" : "red" }}
            >
              {status}
            </Typography>
          )}

          <Divider sx={{ my: 3 }} />

          <Box textAlign="center" mt={2}>
            <Typography variant="caption" color="textSecondary">
              Powered by GreenXchange Blockchain Marketplace
            </Typography>
          </Box>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default Buy;