import React from 'react';
import { Box, Typography, Container, Grid, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '24px 0',
        marginTop: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              GreenXchange
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              A decentralized platform for secure and transparent green credit trading powered by Ethereum blockchain.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link href="/home" color="inherit" underline="hover">
                Home
              </Link>
              <Link href="/credit" color="inherit" underline="hover">
                Credit
              </Link>
              <Link href="/listing" color="inherit" underline="hover">
                Listing
              </Link>
              <Link href="/dashboard" color="inherit" underline="hover">
                Dashboard
              </Link>
            </Box>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: <Link href="mailto:support@greenxchange.com" color="inherit">support@greenxchange.com</Link>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone: +1 (123) 456-7890
            </Typography>
            <Box sx={{ display: 'flex', gap: '16px', mt: 2 }}>
              <IconButton href="https://facebook.com" target="_blank" color="inherit">
                <Facebook />
              </IconButton>
              <IconButton href="https://twitter.com" target="_blank" color="inherit">
                <Twitter />
              </IconButton>
              <IconButton href="https://instagram.com" target="_blank" color="inherit">
                <Instagram />
              </IconButton>
              <IconButton href="https://linkedin.com" target="_blank" color="inherit">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box
          sx={{
            borderTop: '1px solid #555',
            marginTop: '16px',
            paddingTop: '16px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} GreenXchange. All Rights Reserved.
          </Typography>
          <Typography variant="body2">
            Built with ❤️ using React and Material-UI.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
