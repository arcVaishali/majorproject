import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  CircularProgress,
  Container,
  Paper,
  Box,
  Grid,
  MenuItem,
  Avatar,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import Web3 from 'web3';
import axios from 'axios';

const bgUrl =
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80';

// Dummy ABI and contract address (replace with your actual values)
const contractABI = [
  // Add your contract ABI here
];
const contractAddress = '0xYourContractAddressHere';

const projectTypes = [
  'Renewable Energy',
  'Reforestation',
  'Waste Management',
  'Energy Efficiency',
  'Other',
];

const userTypes = [
  { value: 'individual', label: 'Individual' },
  { value: 'company', label: 'Company' },
  { value: 'organization', label: 'Organization' },
];

const CertificateVerification = () => {
  const [form, setForm] = useState({
    userType: 'individual',
    uniqueId: '',
    issuer: '',
    projectName: '',
    projectType: '',
    description: '',
    address: '',
    tokenAmount: 1,
    // Individual fields
    individualName: '',
    individualId: '',
    // Company/Org fields
    companyName: '',
    regNumber: '',
    regAddress: '',
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
        setForm((prev) => ({ ...prev, address: accounts[0] }));
        setStatus('Wallet Connected: ' + accounts[0]);
      } catch (error) {
        setStatus('Wallet connection failed.');
      }
    } else {
      setStatus('Please install MetaMask!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      // 1. Verify the certificate via backend
      const response = await axios.post('http://localhost:5000/verify-certificate', {
        userType: form.userType,
        uniqueId: form.uniqueId,
        issuer: form.issuer,
        projectName: form.projectName,
        projectType: form.projectType,
        description: form.description,
        address: form.address,
        tokenAmount: form.tokenAmount,
        individualName: form.individualName,
        individualId: form.individualId,
        companyName: form.companyName,
        regNumber: form.regNumber,
        regAddress: form.regAddress,
      });

      if (response.data.verified) {
        // 2. Interact with the smart contract using web3.js
        if (!window.ethereum) throw new Error('MetaMask is not installed');
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Call the mint function of the contract
        const tx = await contract.methods
          .mint(form.address, form.tokenAmount)
          .send({ from: accounts[0] });

        setStatus(`Success: Tokens minted! Tx Hash: ${tx.transactionHash}`);
      } else {
        setStatus('Error: Certificate verification failed.');
      }
    } catch (error) {
      setStatus('Error: Something went wrong.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: `linear-gradient(rgba(0,0,0,0.6),rgba(0,128,0,0.3)), url(${bgUrl}) center/cover no-repeat fixed`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Paper
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: 4,
            background: 'rgba(255,255,255,0.6)',
            textAlign: 'center',
          }}
        >
          <Avatar
            sx={{
              bgcolor: 'success.main',
              width: 64,
              height: 64,
              mx: 'auto',
              mb: 2,
              fontSize: 36,
            }}
          >
            ♻️
          </Avatar>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Mint Green Credit Tokens
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={3}>
            Verify your certificate and mint green credits for your sustainable project.
          </Typography>

          <Box
            component="form"
            // onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>User Type</InputLabel>
                  <Select
                    name="userType"
                    value={form.userType}
                    label="User Type"
                    onChange={handleChange}
                  >
                    {userTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Dynamic ID fields */}
              {form.userType === 'individual' && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      label="Name"
                      name="individualName"
                      variant="outlined"
                      value={form.individualName}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="PAN/Aadhar Card Number"
                      name="individualId"
                      variant="outlined"
                      value={form.individualId}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                  </Grid>
                </>
              )}
              {(form.userType === 'company' || form.userType === 'organization') && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      label={form.userType === 'company' ? "Company Name" : "Organization Name"}
                      name="companyName"
                      variant="outlined"
                      value={form.companyName}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Registration Number"
                      name="regNumber"
                      variant="outlined"
                      value={form.regNumber}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Registered Address"
                      name="regAddress"
                      variant="outlined"
                      value={form.regAddress}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                  </Grid>
                </>
              )}

              {/* Common fields */}
              <Grid item xs={12}>
                <TextField
                  label="Certificate Unique ID"
                  name="uniqueId"
                  variant="outlined"
                  value={form.uniqueId}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Certificate Issuer"
                  name="issuer"
                  variant="outlined"
                  value={form.issuer}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Project Name"
                  name="projectName"
                  variant="outlined"
                  value={form.projectName}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Project Type"
                  name="projectType"
                  variant="outlined"
                  value={form.projectType}
                  onChange={handleChange}
                  required
                  fullWidth
                >
                  {projectTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Project Description"
                  name="description"
                  variant="outlined"
                  value={form.description}
                  onChange={handleChange}
                  multiline
                  minRows={2}
                  maxRows={4}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Your Wallet Address"
                  name="address"
                  variant="outlined"
                  value={form.address}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Token Amount"
                  name="tokenAmount"
                  type="number"
                  variant="outlined"
                  value={form.tokenAmount}
                  onChange={handleChange}
                  required
                  fullWidth
                  inputProps={{ min: 1 }}
                />
              </Grid>
            </Grid>

            <Button
              variant="outlined"
              fullWidth
              onClick={connectWallet}
              sx={{
                borderColor: 'secondary',
                color: '#3f51b5',
                "&:hover": { borderColor: "primary" },
                my: 1,
              }}
              disabled={!!account}
            >
              {account ? `Wallet Connected: ${account}` : 'Connect Wallet'}
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={loading}
              fullWidth
              sx={{ py: 1.5, fontWeight: 'bold', mt: 1 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Verify & Mint Tokens'}
            </Button>

            {status && (
              <Typography
                variant="body2"
                color={status.startsWith('Success') ? 'green' : 'error'}
                align="center"
                sx={{ mt: 2 }}
              >
                {status}
              </Typography>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CertificateVerification;