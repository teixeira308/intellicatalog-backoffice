import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; 
import Navbar from "../../components/Navbar/Navbar";
import * as C from "./styles";
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  Stack,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditarProduto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
 
  //if (loading) return <p>Carregando...</p>;
  if (!id) return <p>Produto não encontrado.</p>;

  return (
    <C.Container>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Navbar />
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <IconButton onClick={() => navigate(-1)} sx={{ marginRight: "8px" }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom sx={{ flexGrow: 1, textAlign: "center" }}>
            Editar Produto {id}
          </Typography>
        </Box>
      </Container>
    </C.Container>
  );
};

export default EditarProduto;
