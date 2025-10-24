import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function AddForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("http://192.168.29.184:8080/medicine", data)
      .then((res) => {
        if (res.status === 200) {
          alert("Successfully Added");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(135deg, #f9fafb, #eaf7ee)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 700,
          boxShadow: 6,
          borderRadius: 4,
          backgroundColor: "#ffffff",
        }}
      >
        <CardContent sx={{ p: 5 }}>
          {/* Header */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <IconButton color="primary">
                <ArrowBackIcon fontSize="large" />
              </IconButton>
            </Link>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: "600", color: "#2e7d32" }}
            >
              Add Medicine
            </Typography>
          </Stack>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              label="Medicine Name"
              variant="outlined"
              fullWidth
              {...register("name", { required: "Medicine name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Company"
              variant="outlined"
              fullWidth
              {...register("company", { required: "Company is required" })}
              error={!!errors.company}
              helperText={errors.company?.message}
            />

            <TextField
              label="Stock"
              type="number"
              variant="outlined"
              fullWidth
              {...register("stock", { required: "Stock is required" })}
              error={!!errors.stock}
              helperText={errors.stock?.message}
            />

            <TextField
              label="Stock Limit"
              type="number"
              variant="outlined"
              fullWidth
              {...register("stockLimit", {
                required: "Stock limit is required",
              })}
              error={!!errors.stockLimit}
              helperText={errors.stockLimit?.message}
            />

            <TextField
              label="Cost"
              type="number"
              variant="outlined"
              fullWidth
              {...register("money", { required: "Cost is required" })}
              error={!!errors.money}
              helperText={errors.money?.message}
            />

            <Box textAlign="right" mt={2}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "#2e7d32",
                  "&:hover": { bgcolor: "#256428" },
                  px: 4,
                  py: 1.2,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  borderRadius: 2,
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AddForm;
