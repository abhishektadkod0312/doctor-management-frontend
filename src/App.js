import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  IconButton,
  Divider,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PatientsList from "./Components/PatientsList/PatientsList";
import AddForm from "./Components/AddForm";
import ShowMeds from "./Components/ShowMeds";
import AddPatient from "./Components/AddPatient";
import ShowPatient from "./Components/ShowPatient/ShowPatient";
import LandingPage from "./Components/LandingPage";
import MedicineLists from "./Components/MedicineList/MedicineList";

const drawerWidth = 240;

// 🌈 Theme customization
const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    background: { default: "#f5f7fa" },
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
    h6: { fontWeight: 600 },
  },
});

function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // 🎨 Drawer content with hover animation
  const drawer = (
    <div>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 2,
          bgcolor: "#f0f4ff",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2" }}>
          Clinic System
        </Typography>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon sx={{ color: "#1976d2" }} />
          </IconButton>
        )}
      </Toolbar>
      <Divider />
      <List sx={{ py: 1 }}>
        {[
          { text: "Patients", path: "/" },
          { text: "Add Patient", path: "/addPatient" },
          { text: "Medicines", path: "/medicineList" },
          { text: "Add Medicine", path: "/add" },
        ].map((item) => (
          <Tooltip title={item.text} key={item.path} placement="right">
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={() => isMobile && setMobileOpen(false)}
                sx={{
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    bgcolor: "#e3f2fd",
                    transform: "translateX(4px)",
                  },
                }}
              >
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#333",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </div>
  );

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />

            {/* 🧭 App Bar */}
            <AppBar
              position="fixed"
              sx={{
                zIndex: 1300,
                background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    color="inherit"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: "none" } }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
                    Clinic Management
                  </Typography>
                </Box>
              </Toolbar>
            </AppBar>

            {/* 🗂 Sidebar Drawer */}
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
              {/* Mobile Drawer */}
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                  display: { xs: "block", sm: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                    borderTopRightRadius: 12,
                    borderBottomRightRadius: 12,
                    boxShadow: "4px 0 10px rgba(0,0,0,0.1)",
                  },
                }}
              >
                {drawer}
              </Drawer>

              {/* Desktop Drawer */}
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: "none", sm: "block" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                    borderRight: "1px solid #e0e0e0",
                    backgroundColor: "#ffffff",
                  },
                }}
                open
              >
                {drawer}
              </Drawer>
            </Box>

            {/* 📄 Main Content */}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: { xs: 2, sm: 3 },
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                mt: 8,
                backgroundColor: "#f5f7fa",
                minHeight: "100vh",
                transition: "background 0.3s",
              }}
            >
              <Routes>
                <Route path="/" element={<PatientsList />} />
                 <Route path="/patientsList" element={<PatientsList />} />
                 <Route path="/medicineList" element={<MedicineLists />} />
                 <Route path="/medDetails" element={<ShowMeds />} />
                <Route path="/add" element={<AddForm />} />
                <Route path="/addPatient" element={<AddPatient />} />
                <Route path="/showPatient" element={<ShowPatient />} />
                <Route path="/landing" element={<LandingPage />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
