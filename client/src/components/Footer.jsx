import React from 'react';
import { Box, Typography, Container, Grid, Link, IconButton, Divider } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #0d1a0d 0%, #1b3c1b 100%)',
        color: '#fff',
        pt: 6,
        pb: 2,
        mt: 8,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        boxShadow: '0 -8px 32px 0 rgba(0,64,0,0.25)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Green Glow */}
      <Box
        sx={{
          position: 'absolute',
          left: -120,
          bottom: -120,
          width: 300,
          height: 300,
          bgcolor: 'rgba(0,255,128,0.08)',
          borderRadius: '50%',
          filter: 'blur(32px)',
          zIndex: 0,
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} alignItems="flex-start">
          {/* Company Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: 'rgba(0,255,128,0.18)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 1.5,
                  boxShadow: '0 0 16px 4px rgba(0,255,128,0.12)',
                }}
              >
                <img src="/logo192.png" alt="GreenXchange" width={28} height={28} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 1 }}>
                GreenXchange
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.85, mb: 2 }}>
              A decentralized platform for secure and transparent green credit trading powered by Ethereum blockchain.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <IconButton href="https://facebook.com" target="_blank" sx={{ color: '#00ff80', bgcolor: 'rgba(0,255,128,0.08)', '&:hover': { bgcolor: 'rgba(0,255,128,0.18)' } }}>
                <Facebook />
              </IconButton>
              <IconButton href="https://twitter.com" target="_blank" sx={{ color: '#00ff80', bgcolor: 'rgba(0,255,128,0.08)', '&:hover': { bgcolor: 'rgba(0,255,128,0.18)' } }}>
                <Twitter />
              </IconButton>
              <IconButton href="https://instagram.com" target="_blank" sx={{ color: '#00ff80', bgcolor: 'rgba(0,255,128,0.08)', '&:hover': { bgcolor: 'rgba(0,255,128,0.18)' } }}>
                <Instagram />
              </IconButton>
              <IconButton href="https://linkedin.com" target="_blank" sx={{ color: '#00ff80', bgcolor: 'rgba(0,255,128,0.08)', '&:hover': { bgcolor: 'rgba(0,255,128,0.18)' } }}>
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 1, color: '#00ff80', fontWeight: 600, letterSpacing: 1 }}>
              Quick Links
            </Typography>
            <Divider sx={{ bgcolor: '#00ff80', mb: 2, width: 48 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link href="/home" underline="hover" sx={{
                color: '#fff',
                fontWeight: 500,
                fontSize: 16,
                letterSpacing: 0.5,
                transition: 'color 0.2s',
                '&:hover': { color: '#00ff80' }
              }}>
                Home
              </Link>
              <Link href="/credit" underline="hover" sx={{
                color: '#fff',
                fontWeight: 500,
                fontSize: 16,
                letterSpacing: 0.5,
                '&:hover': { color: '#00ff80' }
              }}>
                Credit
              </Link>
              <Link href="/listing" underline="hover" sx={{
                color: '#fff',
                fontWeight: 500,
                fontSize: 16,
                letterSpacing: 0.5,
                '&:hover': { color: '#00ff80' }
              }}>
                Listing
              </Link>
              <Link href="/dashboard" underline="hover" sx={{
                color: '#fff',
                fontWeight: 500,
                fontSize: 16,
                letterSpacing: 0.5,
                '&:hover': { color: '#00ff80' }
              }}>
                Dashboard
              </Link>
            </Box>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 1, color: '#00ff80', fontWeight: 600, letterSpacing: 1 }}>
              Contact Us
            </Typography>
            <Divider sx={{ bgcolor: '#00ff80', mb: 2, width: 48 }} />
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: <Link href="mailto:support@greenxchange.com" sx={{ color: '#00ff80', fontWeight: 500 }}>support@greenxchange.com</Link>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone: <span style={{ color: '#00ff80', fontWeight: 500 }}>+1 (123) 456-7890</span>
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, opacity: 0.7 }}>
              123 Green Lane, Eco City, Earth
            </Typography>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Divider sx={{ bgcolor: '#00ff80', my: 4, opacity: 0.25 }} />
        <Box
          sx={{
            textAlign: 'center',
            fontSize: 15,
            opacity: 0.85,
            letterSpacing: 0.5,
          }}
        >
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            &copy; {new Date().getFullYear()} <span style={{ color: '#00ff80', fontWeight: 600 }}>GreenXchange</span>. All Rights Reserved.
          </Typography>
          <Typography variant="body2">
            Built with <span style={{ color: '#00ff80' }}>❤️</span> using React and Material-UI.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;