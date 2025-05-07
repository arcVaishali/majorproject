import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import Marketplace from "./components/Marketplace";
import MintGreenCreditToken from "./components/MintGreenCreditToken";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Buy from "./components/Buy";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
  spacing: 8,
});

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/credit" element={<MintGreenCreditToken />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/listing" element={<Marketplace />} />
        <Route path="/buy" element={<Buy />} />
      </Routes>
      <Footer/>
    </Router>
  </ThemeProvider>
);

export default App;
