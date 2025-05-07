import React from 'react';
import { Typography, Button, Container, Grid, Paper, Box , Link} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundColor: '#f4f4f4',
    padding: theme.spacing(30, 30),
    textAlign: 'center',
  },
  section: {
    padding: theme.spacing(12, 0),
  },
  aboutSection: {
    backgroundColor: '#e8f5e9',
    padding: theme.spacing(12, 0),
    textAlign: 'center',
  },
  aboutText: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  footer: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
  },
}));

const GreenXchangeLandingPage = () => {
  const classes = useStyles();

  return (
    <>
      {/* Hero Section */}
      <Box className={classes.hero}>
        <Container maxWidth="md">
          <Typography variant="h2" gutterBottom>
            Welcome to GreenXchange
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph>
            Decentralized Green Credit Trading & Exchange Platform ensuring transparency and security powered by Ethereum blockchain.
          </Typography>
          <Button variant="contained" color="primary" size="large">
          <Link href="/login" color="inherit" underline="hover">
                Get started
              </Link>
          </Button>
        </Container>
      </Box>

      {/* About Section */}
      <Box className={classes.aboutSection}>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            About GreenXchange
          </Typography>
          <Typography variant="body1" className={classes.aboutText}>
            GreenXchange is an innovative decentralized platform that enables individuals, companies, and organizations to trade and exchange green credits. 
            Our mission is to promote environmental sustainability by simplifying green credit trading and ensuring secure, tamper-proof transactions through the power of blockchain technology. 
            Built on the Ethereum blockchain, GreenXchange eliminates fraud, improves transparency, and makes green credit trading accessible to everyone.
          </Typography>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" className={classes.section}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                AI-Powered Analytics
              </Typography>
              <Typography>
                Gain insights into your green credit portfolio with advanced AI analytics.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Blockchain Transparency
              </Typography>
              <Typography>
                Enjoy secure and tamper-proof transactions using Ethereum blockchain.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Real-Time Monitoring
              </Typography>
              <Typography>
                Track performance and trade credits seamlessly in real-time.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default GreenXchangeLandingPage;
