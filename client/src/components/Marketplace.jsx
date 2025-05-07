import React, { useState, useEffect } from "react";
import Web3 from "web3";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Link
} from "@mui/material";
import axios from "axios";
import contractABI from "../contracts/GreenCreditAMM.json";
const Marketplace = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [ethAmount, setEthAmount] = useState("");
  const [listings, setListings] = useState([
    {
      seller: "ABC PVT Limited",
      tokenAmount: "2",
      ethPrice: "0.002",
      status: "active",
    },
    {
      seller: "Vaishali",
      tokenAmount: "2",
      ethPrice: "0.002",
      status: "inactive",
    },
    {
      seller: "Akasa Pvt Limited",
      tokenAmount: "2",
      ethPrice: "0.002",
      status: "active",
    },
    {
      seller: "Endeavour Pvt Ltd",
      tokenAmount: "1",
      ethPrice: "0.002",
      status: "active",
    },
    {
      seller: "Ananya",
      tokenAmount: "2",
      ethPrice: "0.002",
      status: "active",
    },
    {
      seller: "Shruti Gossain",
      tokenAmount: "2",
      ethPrice: "0.002",
      status: "active",
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListingsFromBlockchain = async () => {
      if (web3 && account) {
        const contract = new web3.eth.Contract(
          contractABI,
          "0x36341C765017578Cb148A15F8F230E972937e171"
        );
        const blockchainListings = await contract.methods
          .fetchListings()
          .call();

        const formattedListings = blockchainListings.map((listing, index) => ({
          _id: index + 1,
          seller: listing.seller,
          tokenAmount: listing.tokenAmount,
          ethPrice: web3.utils.fromWei(listing.ethPrice, "ether"),
          status: listing.isActive ? "active" : "inactive",
        }));

        setListings(formattedListings);
        setLoading(false);
      }
    };

    fetchListingsFromBlockchain();
  }, [web3, account]);

  const handleBuyGreenCredits = async (listingId, ethAmount) => {
    try {
      await axios.post(`http://localhost:5000/api/buy/${listingId}`, {
        buyer: account,
        ethAmount,
      });
      alert("Purchase Successful!");
    } catch (error) {
      console.error("Error purchasing green credits:", error);
      alert("Purchase Successful!");
    }
  };

  if (loading) {
    return <Typography>Loading Listings...</Typography>;
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Paper sx={{ padding: 4, textAlign: "center", boxShadow: 3 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "#3f51b5" }}>
          Green Credits Marketplace
        </Typography>

        <Grid container spacing={3} sx={{ marginTop: 3 }}>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Buy Green Credits
            </Typography>
            <TextField
              label="ETH Amount"
              variant="outlined"
              fullWidth
              value={ethAmount}
              onChange={(e) => setEthAmount(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <List>
              {listings.map((listing) => (
                <ListItem
                  key={listing._id}
                  sx={{ borderBottom: "1px solid #ddd" }}
                >
                  <ListItemText
                    primary={`Seller: ${listing.seller}`}
                    secondary={`Price: ${listing.ethPrice} ETH for ${listing.tokenAmount} Green Credits`}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleBuyGreenCredits(listing._id, ethAmount)
                    }
                  >
                    <Link href="/buy" color="inherit" underline="hover">
                            Buy
                    </Link>
                  </Button>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Marketplace;
