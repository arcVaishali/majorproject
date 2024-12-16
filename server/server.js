const express = require("express");
const { Web3 } = require("web3");
const contractArtifact = require("../client/src/contracts/GreenCreditToken.json"); 
const contractABIAMM = require("../client/src/contracts/GreenCreditAMM.json"); 
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');

// Enable CORS for all origins (development only)
app.use(cors()); 

// Or enable CORS for a specific origin (e.g., localhost:3000)
// app.use(cors({
//   origin: 'http://localhost:3000'
// }));

app.use(express.json());

// MongoDB setup
const uri = "mongodb+srv://vaish:9RmuwgIHW9Ygi8pT@chai-backend.dkyf8cy.mongodb.net/?retryWrites=true&w=majority&appName=Chai-backend" ;
mongoose.connect(uri)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB', err));

const certificateSchema = new mongoose.Schema({
  uniqueId: String,
  verified: Boolean,
});
const Certificate = mongoose.model("Certificate", certificateSchema);

// Web3 and Contract Setup
const web3 = new Web3("http://127.0.0.1:7545"); // Ganache RPC URL
const contractAddress = contractArtifact.networks["5777"].address; // Match network ID
const contract = new web3.eth.Contract(contractArtifact.abi, contractAddress);

// Ganache Account Setup
const adminAddress = "0xf940f0f1b92fe8c36d85e95e9e961ddfaff3888b"; // Use one of the Ganache accounts
const adminPrivateKey = "4059f44c08d98eba02110e40f4b40c21562d0837ab738e491bf2778747b40190"; // Corresponding private key for adminAddress

// API to Verify Certificate and Mint Tokens
app.post("/verify-certificate", async (req, res) => {
  try {
    const { uniqueId, address, tokenAmount } = req.body;
    // console.log(req.body)
    // console.log(uniqueId , address , tokenAmount) ;

    // Step 1: Check if the certificate is in the database
    const certificate = await Certificate.findOne({ uniqueId });
    // console.log(certificate)
    // if (!uniqueId || !address || !tokenAmount) {
    //     return res.status(400).json({ message: 'Missing required fields' });
    // }
    if (!certificate || !certificate.verified) {
      return res.status(200).json({ message: "Invalid or unverified certificate" });
    }

    // Step 2: Mint Green Credit Tokens
    const tx = contract.methods.mint(address, web3.utils.toWei(tokenAmount.toString(), "ether"));
    const gas = await tx.estimateGas({ from: adminAddress });
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(adminAddress);

    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: address,
        data,
        gas,
        nonce,
        chainId: 1337, // Ganache default chain ID
      },
      adminPrivateKey
    );

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    res.json({ message: "Tokens minted successfully", receipt });
  } catch (err) {
    console.error(err);
    console.log("Errorrrr")
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Add sample certificate to database (for testing)
app.post("/add-certificate", async (req, res) => {
  const { uniqueId } = req.body;
  const newCert = new Certificate({ uniqueId, verified: true });
  await newCert.save();
  res.json({ message: "Certificate added successfully", uniqueId });
});

const AMMcontractABI = contractABIAMM ;
const AMMcontractAddress = "0x36341C765017578Cb148A15F8F230E972937e171";

const marketplace = new web3.eth.Contract(AMMcontractABI, AMMcontractAddress);

app.use(express.json());

// Fetch all active listings
app.get('/api/listings', async (req, res) => {
    try {
        const listings = await marketplace.methods.fetchListings().call();
        res.json(listings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch listings" });
    }
});

// Buy green credits
app.post('/api/buy/:listingId', async (req, res) => {
    const { listingId } = req.params;
    const { buyer, ethAmount } = req.body;

    try {
        const accounts = await web3.eth.getAccounts();
        const receipt = await marketplace.methods.buyCredits(listingId).send({
            from: buyer,
            value: web3.utils.toWei(ethAmount, 'ether')
        });

        res.json({ success: true, transaction: receipt });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to purchase credits" });
    }
});

const particpantscontractABI = require('../client/src/contracts/ParticipantsRegistryABI.json'); // ABI of the smart contract
const particpantsContractAddress = '0xcc32eA4703E4e5726DC275624684f867B703ee3a';

const newcontract = new web3.eth.Contract(particpantscontractABI, particpantsContractAddress);

app.get('/participants', async (req, res) => {
    try {
        const participants = await newcontract.methods.getParticipants().call();
        res.json(participants);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/register', async (req, res) => {
    const { walletAddress, name, credits } = req.body;
    try {
        const tx = await newcontract.methods.registerParticipant(name, credits).send({ from: walletAddress });
        res.json(tx);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});