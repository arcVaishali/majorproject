import React from 'react';
import {
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Box,
  Link,
  Card,
  CardContent,
  Avatar,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
// import EcoIcon from '@mui/icons-material/Eco';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// Background image URL (replace with your own or a royalty-free image)
const bgUrl =
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80';

// Glassmorphism styled Box
const GlassBox = styled(Box)(({ theme }) => ({
  background: 'rgba(255,255,255,0.15)',
  borderRadius: '24px',
  boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  border: '1px solid rgba(255,255,255,0.18)',
  padding: theme.spacing(6, 4),
  // marginTop: theme.spacing(10),
  marginBottom: theme.spacing(10),
  textAlign: 'center',
  color: '#fff',
}));

const featureList = [
  {
    icon: <HomeIcon color="success" sx={{ fontSize: 40 }} />,
    title: 'AI-Powered Analytics',
    desc: 'Gain deep insights into your green credit portfolio with advanced AI analytics.',
  },
  {
    icon: <SecurityIcon color="primary" sx={{ fontSize: 40 }} />,
    title: 'Blockchain Security',
    desc: 'Enjoy secure, tamper-proof transactions powered by Ethereum blockchain.',
  },
  {
    icon: <TrendingUpIcon color="secondary" sx={{ fontSize: 40 }} />,
    title: 'Real-Time Trading',
    desc: 'Trade and monitor green credits seamlessly in real-time.',
  },
  {
    icon: <FlashOnIcon sx={{ color: '#ffd600', fontSize: 40 }} />,
    title: 'Instant Settlement',
    desc: 'Experience lightning-fast settlement and transfers.',
  },
  {
    icon: <PeopleAltIcon color="info" sx={{ fontSize: 40 }} />,
    title: 'Community Marketplace',
    desc: 'Connect with verified organizations and individuals worldwide.',
  },
  {
    icon: <EmojiEventsIcon sx={{ color: '#43a047', fontSize: 40 }} />,
    title: 'Rewards & Badges',
    desc: 'Earn rewards and badges for sustainable actions and trading.',
  },
];

const GreenXchangeLandingPage = () => (
  <Box
    sx={{
      minHeight: '100vh',
      background: `linear-gradient(rgba(0,0,0,0.7),rgba(0,128,0,0.5)), url(${bgUrl}) center/cover no-repeat fixed`,
      pb: 8,
    }}
  >
    {/* Hero Section */}
    <Container maxWidth="md">
      <GlassBox>
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontWeight: 900,
            letterSpacing: 2,
            textShadow: '0 4px 24px rgba(0,0,0,0.4)',
          }}
        >
          Welcome to GreenXchange
        </Typography>
        <Typography
          variant="h5"
          color="inherit"
          paragraph
          sx={{ mb: 4, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
        >
          The most advanced decentralized Green Credit Trading & Exchange Platform.<br />
          Transparency, security, and sustainability—powered by Ethereum.
        </Typography>
        <Button
          variant="contained"
          color="success"
          size="large"
          sx={{
            px: 5,
            py: 1.5,
            fontWeight: 700,
            fontSize: 20,
            borderRadius: 8,
            boxShadow: '0 4px 24px rgba(76,175,80,0.3)',
          }}
          component={Link}
          href="/login"
        >
          Get Started
        </Button>
        <Box mt={3}>
          <Chip label="🌱 Go Green, Trade Green!" color="success" size="medium" sx={{ fontWeight: 700 }} />
        </Box>
      </GlassBox>
    </Container>

    {/* Features Section */}
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: '#fff', fontWeight: 800, letterSpacing: 1, mb: 6, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
      >
        Platform Features
      </Typography>
      <Grid container spacing={4}>
        {featureList.map((feature, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card
              elevation={6}
              sx={{
                borderRadius: 4,
                background: 'rgba(255,255,255,0.85)',
                minHeight: 220,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: 4,
                px: 2,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.03)',
                  boxShadow: '0 8px 32px 0 rgba(31,38,135,0.25)',
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: '#e8f5e9',
                  width: 64,
                  height: 64,
                  mb: 2,
                  boxShadow: 2,
                }}
              >
                {feature.icon}
              </Avatar>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                {feature.title}
              </Typography>
              <Typography color="textSecondary" align="center">
                {feature.desc}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>

    {/* About Section */}
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Paper
        elevation={8}
        sx={{
          borderRadius: 2,
          p: 5,
          background: 'rgba(255,255,255,0.6)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" fontWeight={800} gutterBottom>
          About GreenXchange
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 18, color: '#333', mb: 2 }}>
          GreenXchange is an innovative decentralized platform that enables individuals, companies, and organizations to trade and exchange green credits. 
          Our mission is to promote environmental sustainability by simplifying green credit trading and ensuring secure, tamper-proof transactions through the power of blockchain technology.
        </Typography>
        <Typography variant="body2" sx={{ color: '#666' }}>
          Built on the Ethereum blockchain, GreenXchange eliminates fraud, improves transparency, and makes green credit trading accessible to everyone.
        </Typography>
      </Paper>
    </Container>

    {/* Call to Action Section */}
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Box
        sx={{
          background: 'linear-gradient(90deg,rgba(66, 204, 112, 0.44) 0%, #38f9d7 100%)',
          borderRadius: 2,
          p: 5,
          textAlign: 'center',
          boxShadow: 4,
        }}
      >
        <Typography variant="h5" fontWeight={700} color="#fff" gutterBottom>
          Ready to make an impact?
        </Typography>
        <Typography variant="body1" color="#fff" sx={{ mb: 3 }}>
          Join GreenXchange and start trading green credits today!
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ px: 5, py: 1.5, fontWeight: 700, fontSize: 18, borderRadius: 8 }}
          component={Link}
          href="/signup"
        >
          Sign Up Now
        </Button>
      </Box>
    </Container>

    {/* Footer */}
    <Box sx={{ mt: 10, py: 4, textAlign: 'center', color: '#fff', opacity: 0.8 }}>
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} GreenXchange. All rights reserved.
      </Typography>
    </Box>
  </Box>
);

export default GreenXchangeLandingPage;