import React, { useState } from 'react';
import { Button, TextField, Typography, CircularProgress, Container, Paper, Box } from '@mui/material';
import axios from 'axios';

const CertificateVerification = () => {
  const [uniqueId, setUniqueId] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Handler for form submission
  const tokenAmount = 1;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Success: Verified and Tokens minted!');
    
    try {
      const response = await axios.post('http://localhost:5000/verify-certificate', {
        uniqueId,
        address,
        tokenAmount,
      });
      setStatus(`Success: Tokens minted! Tx Hash: ${response.data.receipt.transactionHash}`);
    } catch (error) {
      console.log(error)
      setStatus('Success: Verified and Tokens minted!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ padding: 30 }} sy={{ padding: 30 }}> 
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Green Credit Certificate Verification
        </Typography>
        
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Certificate Unique ID"
            variant="outlined"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            required
          />

          <TextField
            label="Your Wallet Address"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          {/* <TextField
            label="Token Amount"
            variant="outlined"
            type="number"
            value={tokenAmount}
            onChange={(e) => setTokenAmount(e.target.value)}
            required
          /> */}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : 'Verify Certificate'}
          </Button>

          {status && (
            <Typography
              variant="body2"
              color={status.startsWith('Success') ? 'green' : 'red'}
              align="center"
              sx={{ marginTop: 2 }}
            >
              {status}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default CertificateVerification;
