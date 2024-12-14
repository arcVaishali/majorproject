import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Button, TextField, Typography, Grid, Paper, Box, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const Marketplace = () => {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState('');
    const [ethAmount, setEthAmount] = useState('');
    const [listings, setListings] = useState([{seller:"ABC PVT Limited" , tokenAmount:"2" , ethPrice:"0.002" , status: "active" }]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const initWeb3 = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);
                const accounts = await web3Instance.eth.requestAccounts();
                setAccount(accounts[0]);

                // Fetch listings from the backend
                fetchListings();
            } else {
                alert('Please install MetaMask!');
            }
        };

        initWeb3();
    }, []);

    const fetchListings = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/listings');
            setListings(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    };

    const handleBuyGreenCredits = async (listingId, ethAmount) => {
        try {
            await axios.post(`http://localhost:5000/api/buy/${listingId}`, {
                buyer: account,
                ethAmount
            });
            alert('Purchase Successful!');
        } catch (error) {
            console.error('Error purchasing green credits:', error);
            alert('Purchase Failed!');
        }
    };

    if (loading) {
        return <Typography>Loading Listings...</Typography>;
    }

    return (
        <Box sx={{ padding: 3, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
            <Paper sx={{ padding: 4, textAlign: 'center', boxShadow: 3 }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
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
                                <ListItem key={listing._id} sx={{ borderBottom: '1px solid #ddd' }}>
                                    <ListItemText
                                        primary={`Seller: ${listing.seller}`}
                                        secondary={`Price: ${listing.ethPrice} ETH for ${listing.tokenAmount} Green Credits`}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleBuyGreenCredits(listing._id, ethAmount)}
                                    >
                                        Buy
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
