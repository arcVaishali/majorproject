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
  Link,
  Avatar,
  Chip,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Divider,
  Container
} from "@mui/material";
import axios from "axios";
import contractABI from "../contracts/GreenCreditAMM.json";
import { green, common, grey } from "@mui/material/colors";

const DUMMY_LISTINGS = [
  {
    _id: 1,
    seller: "ABC PVT Limited",
    tokenAmount: "2",
    ethPrice: "0.002",
    status: "active",
    avatar: "A",
  },
  {
    _id: 2,
    seller: "Vaishali",
    tokenAmount: "2",
    ethPrice: "0.002",
    status: "inactive",
    avatar: "V",
  },
  {
    _id: 3,
    seller: "Akasa Pvt Limited",
    tokenAmount: "2",
    ethPrice: "0.002",
    status: "active",
    avatar: "A",
  },
  {
    _id: 4,
    seller: "Endeavour Pvt Ltd",
    tokenAmount: "1",
    ethPrice: "0.002",
    status: "active",
    avatar: "E",
  },
  {
    _id: 5,
    seller: "Ananya",
    tokenAmount: "2",
    ethPrice: "0.002",
    status: "active",
    avatar: "A",
  },
  {
    _id: 6,
    seller: "Shruti Gossain",
    tokenAmount: "2",
    ethPrice: "0.002",
    status: "active",
    avatar: "S",
  },
];


const bgUrl =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80";

const Marketplace = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [ethAmounts, setEthAmounts] = useState({});
  const [listings, setListings] = useState(DUMMY_LISTINGS);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSeller, setFilterSeller] = useState("");
  const [sortBy, setSortBy] = useState("none");

  // Dummy sellers for filter dropdown
  const allSellers = [
    ...new Set(DUMMY_LISTINGS.map((l) => l.seller)),
  ];
  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
        } catch (err) {
          // User denied wallet connection
        }
      }
    };
    initWeb3();
  }, []);

  // useEffect(() => {
  //   const fetchListingsFromBlockchain = async () => {
  //     setLoading(true);
  //     try {
  //       if (web3) {
  //         const contract = new web3.eth.Contract(
  //           contractABI,
  //           "0x36341C765017578Cb148A15F8F230E972937e171"
  //         );
  //         const blockchainListings = await contract.methods
  //           .fetchListings()
  //           .call();

  //         const formattedListings = blockchainListings.map((listing, index) => ({
  //           _id: index + 1,
  //           seller: listing.seller,
  //           tokenAmount: listing.tokenAmount,
  //           ethPrice: web3.utils.fromWei(listing.ethPrice, "ether"),
  //           status: listing.isActive ? "active" : "inactive",
  //           avatar: listing.seller[0], // Just for demo
  //         }));

  //         setListings(formattedListings);
  //       } else {
  //         // Fallback: Demo listings
  //         setListings([
  //           {
  //             _id: 1,
  //             seller: "ABC PVT Limited",
  //             tokenAmount: "2",
  //             ethPrice: "0.002",
  //             status: "active",
  //             avatar: "A",
  //           },
  //           {
  //             _id: 2,
  //             seller: "Vaishali",
  //             tokenAmount: "2",
  //             ethPrice: "0.002",
  //             status: "inactive",
  //             avatar: "V",
  //           },
  //           {
  //             _id: 3,
  //             seller: "Akasa Pvt Limited",
  //             tokenAmount: "2",
  //             ethPrice: "0.002",
  //             status: "active",
  //             avatar: "A",
  //           },
  //           {
  //             _id: 4,
  //             seller: "Endeavour Pvt Ltd",
  //             tokenAmount: "1",
  //             ethPrice: "0.002",
  //             status: "active",
  //             avatar: "E",
  //           },
  //           {
  //             _id: 5,
  //             seller: "Ananya",
  //             tokenAmount: "2",
  //             ethPrice: "0.002",
  //             status: "active",
  //             avatar: "A",
  //           },
  //           {
  //             _id: 6,
  //             seller: "Shruti Gossain",
  //             tokenAmount: "2",
  //             ethPrice: "0.002",
  //             status: "active",
  //             avatar: "S",
  //           },
  //         ]);
  //       }
  //     } catch (e) {
  //       setListings([]);
  //     }
  //     setLoading(false);
  //   };

  //   fetchListingsFromBlockchain();
  //   // eslint-disable-next-line
  // }, [web3]);

  const handleBuyGreenCredits = async (listingId, ethAmount) => {
    try {
      await axios.post(`http://localhost:5000/api/buy/${listingId}`, {
        buyer: account,
        ethAmount,
      });
      alert("Purchase Successful!");
    } catch (error) {
      console.error("Error purchasing green credits:", error);
      alert("Purchase Failed!");
    }
  };

  const handleEthAmountChange = (listingId, value) => {
    setEthAmounts({ ...ethAmounts, [listingId]: value });
  };

  // Filtering and sorting
  let filteredListings = listings.filter((l) =>
    (filterStatus === "all" || l.status === filterStatus) &&
    (filterSeller === "" || l.seller === filterSeller)
  );
  if (sortBy === "price") {
    filteredListings = [...filteredListings].sort(
      (a, b) => parseFloat(a.ethPrice) - parseFloat(b.ethPrice)
    );
  } else if (sortBy === "amount") {
    filteredListings = [...filteredListings].sort(
      (a, b) => parseInt(b.tokenAmount) - parseInt(a.tokenAmount)
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(rgba(0,0,0,0.7),rgba(0,128,0,0.5)), url(${bgUrl}) center/cover no-repeat fixed`,
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          sx={{
            p: 4,
            borderRadius: 2,
            boxShadow: 4,
            background: "rgba(255,255,255,0.6)",
            textAlign: "center",
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold", color: "#388e3c" }}>
            Green Credits Marketplace
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, color: "#333" }}>
            Buy and sell green credits securely and transparently.
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {/* Filters and Sorting */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  label="Status"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Seller</InputLabel>
                <Select
                  value={filterSeller}
                  label="Seller"
                  onChange={(e) => setFilterSeller(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {allSellers.map((seller) => (
                    <MenuItem key={seller} value={seller}>
                      {seller}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="price">Price (Low to High)</MenuItem>
                  <MenuItem value="amount">Amount (High to Low)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Wallet connect */}
          <Box sx={{ mb: 3 }}>
            <Button
              variant="outlined"
              onClick={async () => {
                if (window.ethereum) {
                  const web3Instance = new Web3(window.ethereum);
                  await window.ethereum.request({ method: "eth_requestAccounts" });
                  const accounts = await web3Instance.eth.getAccounts();
                  setWeb3(web3Instance);
                  setAccount(accounts[0]);
                } else {
                  alert("Please install MetaMask!");
                }
              }}
              sx={{ mr: 2 }}
              disabled={!!account}
            >
              {account ? `Wallet: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
            </Button>
          </Box>

          {/* Listings */}
          {loading ? (
            <Typography>Loading Listings...</Typography>
          ) : (
            <Grid container spacing={3}>
              {filteredListings.length === 0 && (
                <Grid item xs={12}>
                  <Typography>No listings found.</Typography>
                </Grid>
              )}
              {filteredListings.map((listing) => (
                <Grid item xs={12} md={6} key={listing._id}>
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      boxShadow: 2,
                      mb: 2,
                      background: "rgba(255,255,255,0.98)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box display="flex" alignItems="center" mb={1}>
                      <Avatar sx={{ bgcolor: "#388e3c", mr: 2 }}>
                        {listing.avatar}
                      </Avatar>
                      <Typography variant="h6" fontWeight={700}>
                        {listing.seller}
                      </Typography>
                      <Chip
                        label={listing.status === "active" ? "Active" : "Inactive"}
                        color={listing.status === "active" ? "success" : "default"}
                        size="small"
                        sx={{ ml: 2 }}
                      />
                    </Box>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      {listing.tokenAmount} Green Credits @ {listing.ethPrice} ETH
                    </Typography>
                    <TextField
                      label="ETH Amount"
                      variant="outlined"
                      size="small"
                      value={ethAmounts[listing._id] || listing.ethPrice}
                      onChange={(e) =>
                        handleEthAmountChange(listing._id, e.target.value)
                      }
                      sx={{ mb: 2, width: "60%" }}
                    />
                    <Button
                      variant="contained"
                      color="success"
                      disabled={listing.status !== "active" || !account}
                      href="/buy"
                      // onClick={() =>
                      //   handleBuyGreenCredits(
                      //     listing._id,
                      //     ethAmounts[listing._id] || listing.ethPrice
                      //   )
                      // }
                      sx={{ fontWeight: "bold" }}
                    >
                      Buy
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Marketplace;