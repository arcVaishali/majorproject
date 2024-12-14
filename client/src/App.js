import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
// import Dashboard from "./components/Dashboard";
// import UploadCert from "./components/UploadCert";
import Marketplace from "./components/Marketplace";

const App = () => (
  <Router>
    {/* <Marketplace/> */}
    {/* <LoginPage/> */}
    <Routes>
      <Route path="/login" element={<LoginPage/>} />
      {/* <Route path="/dashboard" component={Dashboard} />
      <Route path="/upload" component={UploadCert} /> */}
      <Route path="/marketplace" element={<Marketplace/>} />
    </Routes>
  </Router>
);

export default App;
