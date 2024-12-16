import React , {useState} from "react";
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
} from "@mui/material";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
  background: `linear-gradient(145deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
}));

const RegistrationPage = () => {
    const [account, setAccount] = useState(null);
    const [web3, setWeb3] = useState(null);
    

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
    <Container maxWidth="sm" sx={{ marginTop: 4 , padding : 30 }}>
      {/* <StyledPaper> */}
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
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                variant="outlined"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                variant="outlined"
                required
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
                        // marginLeft:"15px",
                        marginY:"5px"
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
            Already have an account?{' '}
            <Link href="#" underline="hover" color="primary">
              Login
            </Link>
          </Typography>
        </Box>
      {/* </StyledPaper> */}
    </Container>
  );
};

export default RegistrationPage;
