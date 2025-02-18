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
  const [store, setStore] = useState({
    namestore: "",
    opening_hours: "",
    closing_hours: "",
    identificadorexterno: "",
    address: "",
    phone: "",
    email: "",
    delivery_fee: "",
  });
  const [loading, setLoading] = useState(true);

  const filterFormData = (data) => {
    const allowedFields = [
      "namestore",
      "opening_hours",
      "closing_hours",
      "identificadorexterno",
      "address",
      "email",
      "phone",
      "delivery_fee",
    ];
    return Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );
  };

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const data = await getStoreByIdentificador(identificadorexterno);
        setStore(data || {});
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
    const { name, value } = e.target;
    setStore((prevStore) => ({ ...prevStore, [name]: value }));
  };

  const handlePriceChange = (e) => {
    let value = e.target.value.replace(/[^0-9.]/g, '');
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts[1];
    }
    if (parts[1] && parts[1].length > 2) {
      value = `${parts[0]}.${parts[1].slice(0, 2)}`;
    }
    setStore((prevStore) => ({ ...prevStore, delivery_fee: value }));
  };

  const handleSubmit = async () => {
    try {
      const filteredData = filterFormData(store);
      await updateLoja(identificadorexterno, filteredData);
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
          <TextField label="Nome da Loja" name="namestore" fullWidth value={store.namestore ?? ""} onChange={handleChange} required />
          <TextField label="Horário de Abertura" name="opening_hours" fullWidth value={store.opening_hours ?? ""} onChange={handleChange} />
          <TextField label="Horário de Fechamento" name="closing_hours" fullWidth value={store.closing_hours ?? ""} onChange={handleChange} />
          <TextField label="Identificador Externo" name="identificadorexterno" fullWidth value={store.identificadorexterno ?? ""} onChange={handleChange} required />
          <TextField label="Endereço" name="address" fullWidth value={store.address ?? ""} onChange={handleChange} />
          <TextField label="Telefone" name="phone" fullWidth value={store.phone ?? ""} onChange={handleChange} required />
          <TextField label="E-mail" name="email" fullWidth value={store.email ?? ""} onChange={handleChange} />
          <TextField label="Taxa de Entrega" name="delivery_fee" fullWidth type="text" value={store.delivery_fee ?? ""} onChange={handlePriceChange} />
        </Stack>
        
        <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
          <Button onClick={() => navigate(-1)} variant="outlined" color="error" sx={{ mr: 2 }}>Cancelar</Button>
          <Button variant="contained" color="success" onClick={handleSubmit}>Salvar</Button>
        </Box>
      </Container>
    </C.Container>
  );
};

export default EditarLoja;
