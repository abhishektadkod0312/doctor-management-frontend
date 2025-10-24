import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";
import axios from "axios";

function Content({ e }) {
  const [count, setCount] = useState(e.stock);
  const [isModified, setIsModified] = useState(false);
  const inputRef = useRef(null);

  const addStock = () => {
    const confirmChange = window.confirm(`Stock Current value: ${count}?`);
    if (!confirmChange) return;

    if (count > e.stock) {
      axios
        .post("http://192.168.29.184:8080/meds/increase", {
          id: e.id,
          quantity: count - e.stock,
        })
        .then((res) => {
          if (res.status === 200) alert("Successfully Added ✅");
        });
    }

    if (count < e.stock) {
      axios
        .post("http://192.168.29.184:8080/meds/decrease", {
          id: e.id,
          quantity: e.stock - count,
        })
        .then((res) => {
          if (res.status === 200) alert("Successfully Decreased ✅");
        });
    }
  };

  useEffect(() => {
    setIsModified(count !== e.stock);
  }, [count, e.stock]);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Button
        component={Link}
        to="/medicineList"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Card sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <CardMedia
          component="img"
          sx={{ width: { xs: "100%", md: 300 }, objectFit: "cover" }}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7pLeeX0QReL-OwCKl9c8VpoagAGZbFXn6hRN5bXMk2Q&s"
          alt={e.name}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom>
            {e.name}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip label="#digestive" color="primary" />
            <Chip label="#psycosomatic" color="secondary" />
          </Stack>

          <Typography variant="body1" sx={{ mb: 2 }}>
            Med Description
          </Typography>

          {e.money && (
            <Typography variant="h6" sx={{ mb: 2 }}>
              <span style={{ color: "#FFC107" }}>💰 </span>&#8377;{e.money}
            </Typography>
          )}

          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Company: {e.company}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Stock:
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <IconButton
              color="primary"
              onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
            >
              <RemoveIcon />
            </IconButton>
            <Button variant="outlined" disabled>
              {count}
            </Button>
            <IconButton color="primary" onClick={() => setCount((prev) => prev + 1)}>
              <AddIcon />
            </IconButton>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <TextField
              label="Add Custom"
              type="number"
              inputRef={inputRef}
              size="small"
            />
            <Button
              variant="contained"
              color="success"
              onClick={() =>
                setCount((prev) => prev + parseInt(inputRef.current.value || 0))
              }
            >
              Add
            </Button>
          </Stack>

          {isModified && (
            <Button variant="outlined" color="secondary" onClick={addStock}>
              Confirm Changes
            </Button>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default Content;
