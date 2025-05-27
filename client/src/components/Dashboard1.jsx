import React, { useEffect, useState } from "react";
import Web3 from "web3";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Switch,
  FormControlLabel,
  Chip,
  Avatar,
} from "@mui/material";
import { green, common, grey } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import GroupIcon from "@mui/icons-material/Group";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { LinearProgress } from "@mui/material";
// import EcoIcon from "@mui/icons-material/Eco";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import StarIcon from "@mui/icons-material/Star";

const bgUrl =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80";

const Dashboard1 = () => {
  // data + loading
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [entityData, setEntityData] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [search, setSearch] = useState("");
  const [showMint, setShowMint] = useState(true);
  const [showTransfer, setShowTransfer] = useState(true);
  const [showBurn, setShowBurn] = useState(true);


  // fetch demo data
  useEffect(() => {
    const data = [
      {
        name: "Eco Corp",
        address: "0x123…abc",
        credits: 120,
        transactions: 5,
        transactionType: "Mint",
        transactionDate: "2024-06-01",
      },
      {
        name: "Green Solutions",
        address: "0x456…def",
        credits: 80,
        transactions: 3,
        transactionType: "Transfer",
        transactionDate: "2024-06-02",
      },
      {
        name: "SolarX",
        address: "0x789…ghi",
        credits: 200,
        transactions: 8,
        transactionType: "Burn",
        transactionDate: "2024-06-03",
      },
      // …more
    ];
    setEntityData(data);
    setLoading(false);

    const connectWallet = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await web3Instance.eth.getAccounts();
          setWeb3(web3Instance);
          setAccount(accounts[0]);
          // alert("Wallet Connected: " + accounts[0]);
          // return accounts[0] ;
        } catch (error) {
          console.error("Failed to connect wallet", error);
          // alert("Please install MetaMask or another Web3 wallet.");
        }
      } else {
        alert("Please install MetaMask!");
      }
    };
    connectWallet()
  }, []);

  // summary stats
  const totalCredits = entityData.reduce((s, e) => s + e.credits, 0);
  const totalEntities = [...new Set(entityData.map((e) => e.name))].length;
  const totalTransactions = entityData.reduce((s, e) => s + e.transactions, 0);

  // chart data
  const creditsOverTime = entityData.map((e) => ({
    date: e.transactionDate,
    credits: e.credits,
  }));
  const transactionsByType = [
    {
      type: "Mint",
      value: entityData.filter((e) => e.transactionType === "Mint").length,
    },
    {
      type: "Transfer",
      value: entityData.filter((e) => e.transactionType === "Transfer").length,
    },
    {
      type: "Burn",
      value: entityData.filter((e) => e.transactionType === "Burn").length,
    },
  ];
  const creditsByEntity = Object.values(
    entityData.reduce((acc, e) => {
      acc[e.name] = acc[e.name] || { name: e.name, credits: 0 };
      acc[e.name].credits += e.credits;
      return acc;
    }, {})
  );
  const COLORS = [green[500], common.white, grey[600]];

  // filtered lists
  const filteredEntities = entityData.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredTransactions = entityData.filter(
    (e) =>
      (e.transactionType === "Mint" && showMint) ||
      (e.transactionType === "Transfer" && showTransfer) ||
      (e.transactionType === "Burn" && showBurn)
  );

  // export CSV
  const exportCSV = () => {
    const rows = [
      ["Entity", "Credits", "Transactions", "Type", "Date"],
      ...filteredTransactions.map((e) => [
        e.name,
        e.credits,
        e.transactions,
        e.transactionType,
        e.transactionDate,
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <Typography>Loading…</Typography>;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `url(${bgUrl}) center/cover fixed`,
        "&:before": {
          content: '""',
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.7)",
          zIndex: 0,
        },
        position: "relative",
        color: common.white,
        pt: 4,
      }}
    >
      <Container sx={{ position: "relative", zIndex: 1 }}>
        {/* User Profile Widget */}
        <Paper
  sx={{
    display: "flex",
    flexDirection: "column",
    p: 3,
    mb: 4,
    background: "rgba(255,255,255,0.1)",
    borderRadius: 4,
  }}
>
  {/* Top Section: Avatar + Name + Wallet */}
  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
    <Avatar sx={{ bgcolor: green[400], width: 64, height: 64, mr: 2 }}>U</Avatar>
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h6" color={common.white}>
        Vaishali <VerifiedUserIcon sx={{ fontSize: 18, color: green[200], ml: 1 }} />
      </Typography>
      {/* <Typography variant="body2" color={common.white}> */}
        {
          <Typography variant="body2" sx={{ marginTop: 2, color: "#757575" }}>
                        Connected as: {account}
          </Typography>
                    }
      {/* </Typography> */}
      <Chip label="NGO Partner" size="small" color="success" sx={{ mt: 1 }} />
    </Box>
    <Button
      variant="contained"
      color="success"
      href="/profile"
      sx={{ textTransform: "none", ml: 2 }}
    >
      View Profile
    </Button>
  </Box>

  {/* Green Credit Stats */}
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <Typography variant="body2" color={common.white}>
        Green Credits
      </Typography>
      <Typography variant="h6" color="success.main">
        3,450 GC
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body2" color={common.white}>
        CO₂ Offset
      </Typography>
      <Typography variant="h6" color="success.main">
        2.7 Tons
      </Typography>
    </Grid>

    <Grid item xs={6}>
      <Typography variant="body2" color={common.white}>
        Trades Completed
      </Typography>
      <Typography variant="h6" color={common.white}>
        17
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body2" color={common.white}>
        Last Trade
      </Typography>
      <Typography variant="h6" color={common.white}>
        26 May 2025
      </Typography>
    </Grid>

    <Grid item xs={12}>
      <Typography variant="body2" color={common.white}>
        Impact Score
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <LinearProgress variant="determinate" value={78} sx={{ flexGrow: 1, height: 10, borderRadius: 5, mr: 1 }} />
        <Typography variant="body2" color={common.white}>78%</Typography>
      </Box>
    </Grid>

    <Grid item xs={12}>
      <Typography variant="body2" color={common.white}>
        Reputation
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <StarIcon sx={{ color: "#FFD700" }} />
        <StarIcon sx={{ color: "#FFD700" }} />
        <StarIcon sx={{ color: "#FFD700" }} />
        <StarIcon sx={{ color: "#FFD700" }} />
        <StarIcon sx={{ color: "#ccc" }} />
        <Typography variant="body2" color={common.white} sx={{ ml: 1 }}>
          4.0
        </Typography>
      </Box>
    </Grid>
  </Grid>
</Paper>
        {/** Section 1: Summary & Controls **/}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            // summary cards
            {
              icon: (
                <AccountBalanceWalletIcon
                  sx={{ fontSize: 32, color: green[300] }}
                />
              ),
              title: "Total Credits",
              value: totalCredits,
            },
            {
              icon: <GroupIcon sx={{ fontSize: 32, color: green[300] }} />,
              title: "Entities",
              value: totalEntities,
            },
            {
              icon: (
                <ReceiptLongIcon sx={{ fontSize: 32, color: green[300] }} />
              ),
              title: "Transactions",
              value: totalTransactions,
            },
          ].map((c, i) => (
            <Grid key={i} item xs={12} sm={4}>
              <Card sx={{ background: "rgba(255,255,255,0.1)" }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={1}>
                    {c.icon}
                    <Typography ml={1} variant="h6" color={common.white}>
                      {c.title}
                    </Typography>
                  </Box>
                  <Typography variant="h3" color={green[300]}>
                    {c.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {/** search + filters + export **/}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, background: "rgba(0,0,0,0.5)" }}>
              <Box display="flex" flexWrap="wrap" alignItems="center" gap={2}>
                <TextField
                  size="small"
                  placeholder="Search entities…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  sx={{
                    "& .MuiInputBase-input": { color: common.white },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: green[300],
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <SearchIcon sx={{ color: green[300], mr: 1 }} />
                    ),
                  }}
                />

                <Tooltip title="Toggle types">
                  <IconButton sx={{ color: green[300] }}>
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>

                <FormControlLabel
                  control={
                    <Switch
                      checked={showMint}
                      onChange={(e) => setShowMint(e.target.checked)}
                      sx={{ color: green[300] }}
                    />
                  }
                  label="Mint"
                  sx={{ color: common.white }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={showTransfer}
                      onChange={(e) => setShowTransfer(e.target.checked)}
                      sx={{ color: green[300] }}
                    />
                  }
                  label="Transfer"
                  sx={{ color: common.white }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={showBurn}
                      onChange={(e) => setShowBurn(e.target.checked)}
                      sx={{ color: green[300] }}
                    />
                  }
                  label="Burn"
                  sx={{ color: common.white }}
                />

                <Button
                  startIcon={<FileDownloadIcon />}
                  variant="outlined"
                  sx={{ borderColor: green[300], color: green[300] }}
                  onClick={exportCSV}
                >
                  Export CSV
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/** Section 2: Analytics Charts **/}
        <Typography variant="h5" sx={{ mb: 2, color: green[300] }} color={common.white}>
          Analytics & Insights
        </Typography>
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ background: "rgba(255,255,255,0.1)" }}>
              <CardContent>
                <Typography mb={1} color={common.white} >Credits Over Time</Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={creditsOverTime}>
                    <CartesianGrid strokeDasharray="3 3" stroke={grey[700]} />
                    <XAxis dataKey="date" stroke={common.white} />
                    <YAxis stroke={common.white} />
                    <ReTooltip contentStyle={{ background: "#000" }} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="credits"
                      stroke={green[300]}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ background: "rgba(255,255,255,0.1)" }}>
              <CardContent>
                <Typography mb={1} color={common.white}>Transactions by Type</Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={transactionsByType}
                      dataKey="value"
                      nameKey="type"
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      fill={green[300]}
                      label={{ fill: common.white }}
                    >
                      {transactionsByType.map((_, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <ReTooltip contentStyle={{ background: "#000" }} />
                    <Legend wrapperStyle={{ color: common.white }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card sx={{ background: "rgba(255,255,255,0.1)" }}>
              <CardContent>
                <Typography mb={1} color={common.white}>Credits by Entity</Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={creditsByEntity}>
                    <CartesianGrid strokeDasharray="3 3" stroke={grey[700]} />
                    <XAxis dataKey="name" stroke={common.white} />
                    <YAxis stroke={common.white} />
                    <ReTooltip contentStyle={{ background: "#000" }} />
                    <Bar dataKey="credits" fill={green[300]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/** Section 3: Entities Overview **/}
        <Typography variant="h5" sx={{ mb: 2, color: green[300] }}>
          Entities Overview
        </Typography>
        <Grid container spacing={3}>
          {filteredEntities.map((e, i) => (
            <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ background: "rgba(255,255,255,0.1)" }}>
                <CardContent>
                  <Typography variant="h6" mb={1} color={common.white}>
                    {e.name}
                  </Typography>
                  <Typography color={common.white}>Credits: {e.credits}</Typography>
                  <Typography color={common.white}>Txns: {e.transactions}</Typography>
                  <Chip
                    label={e.transactionType}
                    size="small"
                    sx={{
                      mt: 1,
                      background: green[300],
                      color: common.black,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/** Section 4: Recent Transactions **/}
        <Accordion sx={{ mt: 10, background: "rgba(255,255,255,0.1)" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: green[300] }} />}
          >
            <Typography sx={{ color: green[300] }}>
              Recent Transactions
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead sx={{ background: green[300] }}>
                  <TableRow>
                    {["Entity", "Type", "Credits", "Date"].map((h) => (
                      <TableCell
                        key={h}
                        sx={{ color: common.black, fontWeight: 700 }}
                      >
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTransactions.map((e, i) => (
                    <TableRow key={i}>
                      <TableCell>{e.name}</TableCell>
                      <TableCell>{e.transactionType}</TableCell>
                      <TableCell>{e.credits}</TableCell>
                      <TableCell>{e.transactionDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      </Container>
    </Box>
  );
};

export default Dashboard1;
