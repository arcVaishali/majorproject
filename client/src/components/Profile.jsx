import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Button,
  TextField,
  Divider,
  Grid,
  Switch,
  FormControlLabel,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import { green, common } from "@mui/material/colors";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EditIcon from "@mui/icons-material/Edit";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";

const bgUrl =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80";

const Profile = () => {
  const [tab, setTab] = useState(0);
  const [editName, setEditName] = useState("Vaishnavi");
  const [editEmail, setEditEmail] = useState("vaishnavi@email.com");
  const [editWallet, setEditWallet] = useState("0x123...abc");
  const [notif, setNotif] = useState(true);
  const [copied, setCopied] = useState(false);

  // dummy recent activity
  const recentActivities = [
    { type: "Mint", date: "2024-06-01" },
    { type: "Buy", date: "2024-05-28" },
    { type: "Transfer", date: "2024-05-20" },
    { type: "Burn", date: "2024-05-15" },
  ];

  // dummy leaderboard
  const leaderboard = [
    { name: "Eco Corp", credits: 200 },
    { name: "GreenXchange", credits: 150 },
    { name: "Solar Solutions", credits: 120 },
    { name: "Vaishnavi", credits: 100 },
    { name: "Ananya", credits: 80 },
  ];

  // progress toward goal
  const goalProgress = 75; // percent

  const handleTabChange = (_, v) => setTab(v);

  const handleDownload = () => {
    const rows = [
      ["Activity", "Date"],
      ...recentActivities.map((a) => [a.type, a.date]),
      [],
      ["Rank", "Entity", "Credits"],
      ...leaderboard.map((e, i) => [i + 1, e.name, e.credits]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "profile_data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editWallet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

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
      <Container maxWidth="md">
        <Paper
          sx={{
            backdropFilter: "blur(12px)",
            background: "rgba(10,30,10,0.92)",
            p: { xs: 2, sm: 4 },
            marginBottom: 24,
            borderRadius: 2,
            boxShadow: "0 8px 32px 0 rgba(0,128,64,0.18)",
            color: common.white,
            mb: 4,
          }}
        >
          {/* Header */}
          <Box
            display="flex"
            alignItems="center"
            gap={3}
            mb={4}
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <Avatar
                sx={{
                  width: 96,
                  height: 96,
                  bgcolor: green[500],
                  fontSize: 44,
                  border: `3px solid ${green[300]}`,
                  boxShadow: "0 0 0 6px rgba(0,255,128,0.08)",
                }}
              >
                {editName.charAt(0)}
              </Avatar>
              <Chip
                icon={<VerifiedUserIcon sx={{ color: green[900] }} />}
                label="Verified"
                size="small"
                sx={{
                  position: "absolute",
                  bottom: 8,
                  right: -8,
                  bgcolor: green[300],
                  color: green[900],
                  fontWeight: 700,
                  px: 1,
                  fontSize: 13,
                  boxShadow: 2,
                }}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{ color: green[100], letterSpacing: 1 }}
              >
                {editName}
              </Typography>
              <Typography sx={{ color: green[300], fontSize: 18, mb: 0.5 }}>
                NGO Partner
              </Typography>
              <Typography color="white" sx={{ opacity: 0.85 }}>
                {editEmail}
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                mt={1}
                sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: green[200], fontWeight: 500 }}
                >
                  {editWallet}
                </Typography>
                <Tooltip title={copied ? "Copied!" : "Copy"}>
                  <IconButton
                    size="small"
                    onClick={handleCopy}
                    sx={{ color: green[300], ml: 0.5 }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <Button
              variant="contained"
              sx={{
                bgcolor: green[400],
                color: "#111",
                fontWeight: 700,
                px: 3,
                py: 1.2,
                borderRadius: 3,
                boxShadow: "0 2px 16px 0 rgba(0,255,128,0.12)",
                textTransform: "none",
                fontSize: 18,
                mt: { xs: 2, sm: 0 },
                "&:hover": { bgcolor: green[300], color: "#111" },
              }}
              startIcon={<EditIcon />}
              onClick={() => setTab(1)}
            >
              Edit Profile
            </Button>
          </Box>

          {/* Tabs */}
          <Tabs
            value={tab}
            onChange={handleTabChange}
            indicatorColor="secondary"
            textColor="inherit"
            sx={{
              mb: 2,
              "& .MuiTab-root": {
                color: green[100],
                fontWeight: 600,
                fontSize: 17,
                letterSpacing: 0.5,
                textTransform: "none",
                "&.Mui-selected": {
                  color: green[300],
                },
              },
              "& .MuiTabs-indicator": {
                background: green[300],
                height: 4,
                borderRadius: 2,
              },
            }}
          >
            <Tab label="Overview" />
            <Tab label="Edit Profile" />
            <Tab label="Wallet" />
            <Tab label="Settings" />
          </Tabs>
          <Divider sx={{ mb: 3, bgcolor: green[900], opacity: 0.18 }} />

          {/* Overview */}
          {tab === 0 && (
            <Grid container spacing={3}>
              {/* Left Column */}
              <Grid item xs={12} md={6}>
                {/* Total Credits */}
                <Card
                  sx={{
                    mb: 2,
                    borderRadius: 4,
                    boxShadow: 3,
                    background:
                      "linear-gradient(120deg, rgba(0,64,32,0.7) 60%, rgba(0,255,128,0.09) 100%)",
                    color: common.white,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: green[200] }}
                    >
                      Green Credits
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{ color: green[300], fontWeight: 700 }}
                    >
                      100
                    </Typography>
                    <Typography sx={{ color: green[100], opacity: 0.8 }}>
                      Total Credits Owned
                    </Typography>
                  </CardContent>
                </Card>
                {/* Goal Progress */}
                <Card
                  sx={{
                    mb: 2,
                    borderRadius: 4,
                    boxShadow: 3,
                    textAlign: "center",
                    py: 2,
                    background:
                      "linear-gradient(120deg, rgba(0,64,32,0.7) 60%, rgba(0,255,128,0.09) 100%)",
                    color: common.white,
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: green[200] }}
                  >
                    Goal Progress
                  </Typography>
                  <Box position="relative" display="inline-flex">
                    <CircularProgress
                      variant="determinate"
                      value={goalProgress}
                      size={100}
                      thickness={5}
                      sx={{
                        color: green[400],
                        background: "rgba(0,255,128,0.08)",
                        borderRadius: "50%",
                      }}
                    />
                    <Box
                      top={0}
                      left={0}
                      bottom={0}
                      right={0}
                      position="absolute"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ color: green[300], fontWeight: 700 }}
                      >
                        {goalProgress}%
                      </Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ color: green[100], mt: 1, opacity: 0.8 }}>
                    toward monthly goal
                  </Typography>
                </Card>
                {/* Download Data */}
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  fullWidth
                  onClick={handleDownload}
                  sx={{
                    mt: 1,
                    borderColor: green[300],
                    color: green[300],
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    "&:hover": {
                      borderColor: green[400],
                      color: green[400],
                      background: "rgba(0,255,128,0.04)",
                    },
                  }}
                >
                  Download Data
                </Button>
              </Grid>

              {/* Right Column */}
              <Grid item xs={12} md={6}>
                {/* Recent Activity Timeline */}
                <Card
                  sx={{
                    mb: 2,
                    borderRadius: 4,
                    boxShadow: 3,
                    background:
                      "linear-gradient(120deg, rgba(0,64,32,0.7) 60%, rgba(0,255,128,0.09) 100%)",
                    color: common.white,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: green[200] }}
                    >
                      Recent Activity
                    </Typography>
                    <Timeline position="right">
                      {recentActivities.map((act, i) => (
                        <TimelineItem key={i}>
                          <TimelineOppositeContent
                            sx={{ flex: 0.3, color: green[100] }}
                          >
                            {act.date}
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot
                              sx={{
                                bgcolor:
                                  act.type === "Mint"
                                    ? green[400]
                                    : act.type === "Burn"
                                    ? "#ff5252"
                                    : green[200],
                                border:
                                  act.type === "Mint"
                                    ? `2px solid ${green[300]}`
                                    : undefined,
                              }}
                            />
                            {i < recentActivities.length - 1 && (
                              <TimelineConnector sx={{ bgcolor: green[300] }} />
                            )}
                          </TimelineSeparator>
                          <TimelineContent>
                            <Typography
                              sx={{ color: green[100], fontWeight: 500 }}
                            >
                              {act.type}
                            </Typography>
                          </TimelineContent>
                        </TimelineItem>
                      ))}
                    </Timeline>
                  </CardContent>
                </Card>
                {/* Leaderboard */}
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: 3,
                    background:
                      "linear-gradient(120deg, rgba(0,64,32,0.7) 60%, rgba(0,255,128,0.09) 100%)",
                    color: common.white,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: green[200] }}
                    >
                      Leaderboard
                    </Typography>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{ color: green[300], fontWeight: 700 }}
                            >
                              Rank
                            </TableCell>
                            <TableCell
                              sx={{ color: green[300], fontWeight: 700 }}
                            >
                              Entity
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{ color: green[300], fontWeight: 700 }}
                            >
                              Credits
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {leaderboard.map((e, i) => (
                            <TableRow key={i}>
                              <TableCell sx={{ color: green[100] }}>
                                {i + 1}
                              </TableCell>
                              <TableCell sx={{ color: green[100] }}>
                                {e.name}
                              </TableCell>
                              <TableCell
                                align="right"
                                sx={{ color: green[100] }}
                              >
                                {e.credits}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Edit Profile */}
          {tab === 1 && (
            <Box
              component="form"
              sx={{
                maxWidth: 400,
                mx: "auto",
                mt: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                fullWidth
                InputProps={{
                  sx: {
                    color: green[100],
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: green[300],
                    },
                  },
                }}
                InputLabelProps={{ sx: { color: green[300] } }}
              />
              <TextField
                label="Email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                fullWidth
                InputProps={{
                  sx: {
                    color: green[100],
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: green[300],
                    },
                  },
                }}
                InputLabelProps={{ sx: { color: green[300] } }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: green[400],
                  color: "#111",
                  fontWeight: 700,
                  borderRadius: 3,
                  mt: 2,
                  "&:hover": { bgcolor: green[300], color: "#111" },
                }}
              >
                Save Changes
              </Button>
            </Box>
          )}

          {/* Wallet */}
          {tab === 2 && (
            <Box sx={{ maxWidth: 500, mx: "auto", mt: 2 }}>
              <Card
                sx={{
                  mb: 2,
                  borderRadius: 4,
                  boxShadow: 3,
                  background:
                    "linear-gradient(120deg, rgba(0,64,32,0.7) 60%, rgba(0,255,128,0.09) 100%)",
                  color: common.white,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: green[200] }}
                  >
                    Wallet Address
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography
                      sx={{ wordBreak: "break-all", color: green[100] }}
                    >
                      {editWallet}
                    </Typography>
                    <Tooltip title={copied ? "Copied!" : "Copy"}>
                      <IconButton
                        size="small"
                        onClick={handleCopy}
                        sx={{ color: green[300], ml: 0.5 }}
                      >
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Button
                    variant="outlined"
                    sx={{
                      mt: 2,
                      borderColor: green[300],
                      color: green[300],
                      fontWeight: 600,
                      "&:hover": {
                        borderColor: green[400],
                        color: green[400],
                        background: "rgba(0,255,128,0.04)",
                      },
                    }}
                    onClick={handleCopy}
                  >
                    Copy Address
                  </Button>
                </CardContent>
              </Card>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: 3,
                  background:
                    "linear-gradient(120deg, rgba(0,64,32,0.7) 60%, rgba(0,255,128,0.09) 100%)",
                  color: common.white,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: green[200] }}
                  >
                    Credits Owned
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ color: green[300], fontWeight: 700 }}
                  >
                    100
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      bgcolor: green[400],
                      color: "#111",
                      fontWeight: 700,
                      borderRadius: 3,
                      "&:hover": { bgcolor: green[300], color: "#111" },
                    }}
                  >
                    View on Explorer
                  </Button>
                </CardContent>
              </Card>
            </Box>
          )}

          {/* Settings */}
          {tab === 3 && (
            <Box sx={{ maxWidth: 400, mx: "auto", mt: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ color: green[200] }}>
                Notification Settings
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={notif}
                    onChange={(e) => setNotif(e.target.checked)}
                    color="success"
                  />
                }
                label="Email Notifications"
                sx={{ color: green[100] }}
              />
              <Divider sx={{ my: 2, bgcolor: green[900], opacity: 0.18 }} />
              <Typography variant="h6" gutterBottom sx={{ color: green[200] }}>
                Account Actions
              </Typography>
              <Button
                variant="outlined"
                color="error"
                sx={{
                  mt: 1,
                  borderRadius: 3,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  borderColor: "#ff5252",
                  color: "#ff5252",
                  "&:hover": { bgcolor: "rgba(255,82,82,0.08)" },
                }}
              >
                Delete Account
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile;
