import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const mockTransactions = [
  { id: 1, type: 'Mint', amount: 50, date: '2024-06-01' },
  { id: 2, type: 'Buy', amount: 30, date: '2024-06-02' },
  { id: 3, type: 'Sell', amount: 20, date: '2024-06-03' },
];

const Transactions = () => (
  <Container sx={{ py: 6 }}>
    <Typography variant="h4" gutterBottom align="center">Transaction History</Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockTransactions.map(tx => (
            <TableRow key={tx.id}>
              <TableCell>{tx.type}</TableCell>
              <TableCell>{tx.amount}</TableCell>
              <TableCell>{tx.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Container>
);

export default Transactions;