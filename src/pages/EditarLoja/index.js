import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LojaApi from "../../services/lojaApi";
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

const EditarLoja = () => {
  const { identificadorexterno } = useParams();
  const navigate = useNavigate();
  const { getStoreByIdentificador, updateLoja } = LojaApi();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const data = await getStoreByIdentificador(identificadorexterno);
        setStore(data);
      } catch (error) {
        console.error("Erro ao carregar loja:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (identificadorexterno) {
      fetchStore();
    }
  }, [identificadorexterno, getStoreByIdentificador]);

  const handleChange = (e) => {
    setStore({ ...store, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await updateLoja(identificadorexterno, store);
      alert("Loja atualizada com sucesso!");
      navigate(-1);
    } catch (error) {
      console.error("Erro ao atualizar loja:", error);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!store) return <p>Loja não encontrada.</p>;

  return (
    <C.Container>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Navbar />
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <IconButton onClick={() => navigate(-1)} sx={{ marginRight: "8px" }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom sx={{ flexGrow: 1, textAlign: "center" }}>
            Editar Loja {store.namestore}
          </Typography>
        </Box>

        <Stack spacing={2}>
          <TextField label="Nome da Loja" name="namestore" fullWidth value={store.namestore} onChange={handleChange} />
          <TextField label="Horário de Abertura" name="opening_hours" fullWidth value={store.opening_hours} onChange={handleChange} />
          <TextField label="Horário de Fechamento" name="closing_hours" fullWidth value={store.closing_hours} onChange={handleChange} />
          <Select name="status" value={store.status} onChange={handleChange} fullWidth>
            <MenuItem value="Aberta">Aberta</MenuItem>
            <MenuItem value="Fechada">Fechada</MenuItem>
          </Select>
          <TextField label="Endereço" name="address" fullWidth value={store.address} onChange={handleChange} />
          <TextField label="Telefone" name="phone" fullWidth value={store.phone} onChange={handleChange} />
          <TextField label="E-mail" name="email" fullWidth value={store.email} onChange={handleChange} />
          <TextField label="Taxa de Entrega" name="delivery_fee" fullWidth type="number" value={store.delivery_fee || ""} onChange={handleChange} />
        </Stack>
        
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
          Salvar Alterações
        </Button>
      </Container>
    </C.Container>
  );
};

export default EditarLoja;
