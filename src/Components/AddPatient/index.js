import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function AddPatient() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://192.168.29.184:8080/patient", data);
      if (res.status === 200) {
        alert("Successfully Added");
        reset();
      }
    } catch (err) {
      alert("Failed to add patient. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        p: { xs: 2, md: 4 },
        mt: 4,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 700,
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          background: "#f8f9fb",
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "#1976d2" }}>
              <IconButton color="primary" size="large">
                <ArrowBackIcon fontSize="large" />
              </IconButton>
            </Link>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                flexGrow: 1,
                color: "#1976d2",
              }}
            >
              Add Patient
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Patient Number"
                  variant="outlined"
                  {...register("patientNumber", { required: true })}
                  error={!!errors.patientNumber}
                  helperText={
                    errors.patientNumber && "Patient number is required"
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  {...register("name", { required: true })}
                  error={!!errors.name}
                  helperText={errors.name && "Name is required"}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Contact Number"
                  variant="outlined"
                  type="number"
                  {...register("phone", {
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                  })}
                  error={!!errors.phone}
                  helperText={
                    errors.phone &&
                    "Enter a valid 10-digit phone number"
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  variant="outlined"
                  multiline
                  minRows={3}
                  {...register("address", { required: true })}
                  error={!!errors.address}
                  helperText={errors.address && "Address is required"}
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 4,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.2,
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #1565c0, #1e88e5)",
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AddPatient;
