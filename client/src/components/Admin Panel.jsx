import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const AdminPanel = () => (
  <Container sx={{ py: 6 }}>
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Admin Panel</Typography>
      <Typography>Manage users, credits, and platform settings here.</Typography>
    </Paper>
  </Container>
);

export default AdminPanel;