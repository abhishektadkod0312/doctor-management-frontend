import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Session from "./Session";
import Finalize from "./Finalize";

function Content({ e: patient }) {
  const [meds, setMeds] = useState([]);
  const [medsBought, setMedsBought] = useState(new Set());
  const [medsFinalize, setMedsFinalized] = useState(new Set());
  const [medsConfirm, setMedsConfirm] = useState([]);
  const [history, setHistory] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  const medRef = useRef(null);

  const getAllMedicines = async () => {
    const res = await axios.get("http://192.168.29.184:8080/medicines");
    setMeds(res.data);
  };

  const getSessions = async () => {
    const res = await axios.get("http://192.168.29.184:8080/sessions");
    if (res.status === 200) setHistory(res.data);
  };

  const onsubmitInput = async (event) => {
    const key = event.target.value;
    if (key) {
      const res = await axios.get(
        `http://192.168.29.184:8080/search/medicine/${key}`
      );
      setMeds(res.data);
    } else {
      getAllMedicines();
    }
  };

  const addMedsBought = (med) => setMedsBought(new Set([...medsBought, med]));
  const addMedsFinalize = (med) =>
    setMedsFinalized(new Set([...medsFinalize, med]));
  const deleteMedicine = (med) =>
    setMedsBought(new Set([...medsBought].filter((m) => m !== med)));
  const deleteMedicineFinalized = (med) =>
    setMedsFinalized(new Set([...medsFinalize].filter((m) => m !== med)));

  const addSession = () => {
    const sessionData = {
      patient: patient.id,
      medicinesRequests: medsConfirm,
    };
    axios.post("http://192.168.29.184:8080/session", sessionData).then(() => {
      alert("✅ Successful Transaction");
      getSessions();
      setMedsBought(new Set());
      setMedsFinalized(new Set());
      setMedsConfirm([]);
    });
  };

  // update medsConfirm whenever medsFinalize changes
  useEffect(() => {
    setMedsConfirm([...medsFinalize].map((m) => ({ id: m.id, name: m.name })));
  }, [medsFinalize]);

  useEffect(() => {
    getAllMedicines();
    getSessions();
  }, []);

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f7f6", minHeight: "100vh" }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} mb={4}>
        <Link to="/patientsList">
          <ArrowBackIcon fontSize="large" color="primary" />
        </Link>
        <Typography variant="h4" fontWeight="bold">
          {patient.name}
        </Typography>
      </Stack>

      {/* Tabs */}
      <Card sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={(e, val) => setTabValue(val)}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Home" />
          <Tab label="History" />
        </Tabs>
      </Card>

      {/* Tab Content */}
      {tabValue === 0 && (
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          {/* Medicine Search */}
          <Card sx={{ flex: 1, p: 2 }}>
            <TextField
              fullWidth
              placeholder="Search medicines..."
              onInput={onsubmitInput}
              inputRef={medRef}
            />
            <List>
              {meds.map((med) => (
                <ListItem
                  key={med.id}
                  button
                  onClick={() => addMedsBought(med)}
                  sx={{ my: 0.5 }}
                >
                  <ListItemText primary={med.name} />
                </ListItem>
              ))}
            </List>
          </Card>

          <Divider orientation="vertical" flexItem />

          {/* Medicines Bought */}
          <Card sx={{ flex: 1, p: 2 }}>
            <Typography variant="h6" mb={1}>
              Selected Medicines
            </Typography>
            <List>
              {[...medsBought].map((med) => (
                <Session
                  key={med.id}
                  ele={med}
                  addMedsFinalize={addMedsFinalize}
                  deleteMedicine={deleteMedicine}
                />
              ))}
            </List>
          </Card>

          <Divider orientation="vertical" flexItem />

          {/* Finalized Medicines */}
          <Card sx={{ flex: 1, p: 2 }}>
            <Typography variant="h6" mb={1}>
              Finalized Medicines
            </Typography>
            <List>
              {[...medsFinalize].map((med) => (
                <Finalize
                  key={med.id}
                  ele={med}
                  deleteMedicineFinalized={deleteMedicineFinalized}
                  deleteMedicine={deleteMedicine}
                />
              ))}
            </List>
            {medsFinalize.size > 0 && (
              <Button
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
                fullWidth
                onClick={addSession}
              >
                Confirm
              </Button>
            )}
          </Card>
        </Stack>
      )}

      {tabValue === 1 && (
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" mb={2}>
            History
          </Typography>
          {history.length > 0 ? (
            <List>
              {history.map((h) => (
                <ListItem key={h.id}>
                  <ListItemText primary={`Session ID: ${h.id}`} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No data available</Typography>
          )}
        </Card>
      )}
    </Box>
  );
}

export default Content;
