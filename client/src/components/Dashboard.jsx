import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, CircularProgress, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Web3 from 'web3';

const Dashboard = () => {
  const [entityData, setEntityData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize Web3 (assuming you're using Metamask)
  const web3 = new Web3(window.ethereum);

  // Smart contract ABI and address (you'll need the actual ABI and address of your smart contract)
  const contractABI = [/* Your contract ABI here */];
  const contractAddress = '0xYourContractAddress';

  const fetchEntityData = async () => {
    try {
      // Get the contract instance
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      
      // Fetch the data (adjust according to your contract's methods)
      const data = await contract.methods.getEntityData().call();
      
      // Process data if needed, then set state
      setEntityData(data);
    } catch (error) {
      console.error("Error fetching data from blockchain", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntityData();
  }, []);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
        <Typography variant="h6">Loading Data...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Grid container spacing={3}>
        {entityData.map((entity, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{entity.name}</Typography>
                <Typography color="textSecondary">{entity.address}</Typography>
                <Typography variant="body2" color="textSecondary">Credits: {entity.credits}</Typography>
                <Typography variant="body2" color="textSecondary">Transactions: {entity.transactions}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Typography variant="h5" gutterBottom mt={4}>Entity Transactions</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Entity</TableCell>
              <TableCell>Transaction Type</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entityData.map((entity, index) => (
              <TableRow key={index}>
                <TableCell>{entity.name}</TableCell>
                <TableCell>{entity.transactionType}</TableCell>
                <TableCell>{entity.transactionDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Dashboard;
