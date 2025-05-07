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
} from "@mui/material";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
  background: `linear-gradient(145deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
}));

const Buy = () => {
  const [tokens, setTokens] = useState("");
  const [pricePerToken] = useState(0.001); // Assume each token costs 10 units
  const [totalCost, setTotalCost] = useState(0);

  const handleTokenChange = (event) => {
    const value = event.target.value;
    setTokens(value);
    setTotalCost(value * pricePerToken);
  };

  const handlePurchase = () => {
    if (tokens > 0) {
      alert(`You have successfully purchased ${tokens} Green Credit Tokens!`);
    } else {
      alert("Please enter a valid number of tokens.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 , padding: 30 }}>
      {/* <StyledPaper> */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#2E7D32" }}
        >
          Buy Green Credit Tokens
        </Typography>
        <Typography
          variant="body1"
          align="center"
          gutterBottom
          sx={{ color: "#4CAF50" }}
        >
          Support sustainability by purchasing Green Credits.
        </Typography>

        <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
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
                Total Cost: {totalCost} ETH
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 1.5, fontWeight: "bold" }}
            onClick={handlePurchase}
          >
            Confirm Purchase
          </Button>
        </Box>
      {/* </StyledPaper> */}
    </Container>
  );
};

export default Buy;
