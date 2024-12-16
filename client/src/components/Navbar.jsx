import React, { useState , useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const handleSignIn = () => {
    setIsLoggedIn(!isLoggedIn); // Toggle Sign In/Sign Out
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]); // Set wallet address
        setIsCopied(false); // Reset copy state
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

   // Function to copy wallet address to clipboard
   const copyToClipboard = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress).then(() => {
        setIsCopied(true); // Indicate that the address has been copied
        setTimeout(() => setIsCopied(false), 2000); // Reset copy state after 2 seconds
      });
    }
  };

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]); // Set wallet address if already connected
          }
        } catch (error) {
          console.error("Failed to check wallet connection:", error);
        }
      } else {
        console.warn("MetaMask is not installed!");
      }
    };

    checkIfWalletIsConnected(); // Call the check function
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ backgroundColor: "#0A1929" }}>
        <Toolbar>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <img
              src="https://i.ibb.co/5kkV1CR/greenxchange-logo-no-background.png"
              alt="GreenXchange Logo"
              style={{
                height: "40px",
                marginRight: "10px",
              }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", color: "#64FFDA" }}
            >
              GreenXchange
            </Typography>
          </Box>

          {/* Links for larger screens */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: "1rem" }}>
            {["Home", "Credit", "Listing", "Dashboard"].map((text) => (
              <Button
                key={text}
                component={Link}
                to={`/${text.toLowerCase()}`}
                sx={{
                  color: "#64FFDA",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {text}
              </Button>
            ))}
          </Box>

          {/* Buttons */}
          {/* <Box sx={{ display: "flex", gap: "1rem" }}> */}
              {/* Sign In/Sign Out Button */}
              {/* <Button */}
                {/* onClick={handleSignIn}
                sx={{
                  color: isLoggedIn ? "#FF6347" : "#64FFDA",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  border: "1px solid",
                  borderRadius: "20px",
                  marginX: "12px"
                }}
              > */}
                {/* {isLoggedIn ? "Sign Out" : "Sign In"} */}
              {/* </Button> */}
            {/* </Box> */}

            {/* Connect Wallet Button */}
            <Button
              onClick={walletAddress ? copyToClipboard : connectWallet}
              sx={{
                color: walletAddress ? "#FFD700" : "#64FFDA",
                textTransform: "uppercase",
                fontWeight: "bold",
                border: "1px solid",
                borderRadius: "20px"
              }}
            >
              {walletAddress ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
            </Button>


          {/* Hamburger Menu for smaller screens */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon sx={{ color: "#64FFDA" }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ ".MuiDrawer-paper": { backgroundColor: "#0A1929", color: "#64FFDA" } }}
      >
        <Box sx={{ width: 250 }}>
          {/* Close Button */}
          <IconButton onClick={toggleDrawer(false)} sx={{ margin: "0.5rem" }}>
            <CloseIcon sx={{ color: "#64FFDA" }} />
          </IconButton>

          {/* Drawer Links */}
          <List>
            {["Home", "About", "Services", "Contact"].map((text) => (
              <ListItem button key={text} component={Link} to={`/${text.toLowerCase()}`}>
                <ListItemText
                  primary={text}
                  sx={{ textAlign: "center", textTransform: "uppercase" }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
