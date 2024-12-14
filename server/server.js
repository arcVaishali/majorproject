require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const certRoutes = require("./routes/certRoutes");
const Web3 = require('web3');
const GreenCreditAMMABI = require('./GreenCreditAMMABI.json');
const GreenCreditTokenABI = require('./GreenCreditTokenABI.json');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/cert", certRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'));
const ammContractAddress = '0xD3D2ab64F8A5df68f0baA8A1c5A8babADb6bcf8c'; // Example AMM contract address
const tokenContractAddress = '0x7E2fB9590BC1F9997FDb664b4efe954769F954a1'; // Example token contract address
const ammContract = new web3.eth.Contract(GreenCreditAMMABI, ammContractAddress);
const tokenContract = new web3.eth.Contract(GreenCreditTokenABI, tokenContractAddress);

app.use(express.json());

// MongoDB Schema for Listings
const listingSchema = new mongoose.Schema({
    seller: String,
    tokenAmount: Number,
    ethPrice: Number,
    status: { type: String, enum: ['active', 'sold'], default: 'active' },
    createdAt: { type: Date, default: Date.now }
});

const Listing = mongoose.model('Listing', listingSchema);

// Get all active listings
app.get('/api/listings', async (req, res) => {
    try {
        const listings = await Listing.find({ status: 'active' });
        res.json(listings);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching listings' });
    }
});

// Add a listing
app.post('/api/listings', async (req, res) => {
    const { seller, tokenAmount, ethPrice } = req.body;
    const newListing = new Listing({ seller, tokenAmount, ethPrice });
    
    try {
        await newListing.save();
        res.status(201).json({ message: 'Listing created successfully', listing: newListing });
    } catch (err) {
        res.status(500).json({ message: 'Error adding listing' });
    }
});

// Buy Green Credits (Eth to Token)
app.post('/api/buy/:listingId', async (req, res) => {
    const { listingId } = req.params;
    const { buyer, ethAmount } = req.body;

    const listing = await Listing.findById(listingId);

    if (!listing) {
        return res.status(404).json({ message: 'Listing not found' });
    }

    // Execute the AMM contract to swap ETH for tokens
    try {
        const ethAmountInWei = web3.utils.toWei(ethAmount.toString(), 'ether');
        const tokensToBuy = (ethAmountInWei * listing.tokenAmount) / (listing.ethPrice * web3.utils.toWei('1', 'ether'));

        await ammContract.methods.ethToToken(tokensToBuy)
            .send({ from: buyer, value: ethAmountInWei });

        // Update the listing status after a successful purchase
        listing.status = 'sold';
        await listing.save();

        res.json({ message: 'Transaction successful', tokensBought: tokensToBuy });
    } catch (err) {
        res.status(500).json({ message: 'Error during transaction', error: err });
    }
});

// Server setup
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
