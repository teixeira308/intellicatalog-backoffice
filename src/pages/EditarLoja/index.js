import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LojaApi from "../../services/lojaApi";
import Navbar from "../../components/Navbar/Navbar";
import { NumericFormat } from 'react-number-format';
import * as C from "./styles";
import {
  Container,
  Typography,
  Button,
  Select,
  MenuItem,
  IconButton,
  Card,
  CardContent,
  Box,
  Stack,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EditarLoja = () => {
  const { identificadorexterno } = useParams();
  const navigate = useNavigate();

  const { getStoreByIdentificador, updateLoja } = LojaApi();
  

  if (!identificadorexterno) return <p>Carregando...</p>;

  return (

    <C.Container>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Navbar />
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <IconButton onClick={() => navigate(-1)} sx={{ marginRight: "8px" }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom sx={{ flexGrow: 1, textAlign: "center" }}>
            Editar Loja
          </Typography>
        </Box>


     
      </Container>
    </C.Container >
  );
};

export default EditarLoja;
