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
    id: "",
    namestore: "",
    opening_hours: "",
    closing_hours: "",
    identificadorexterno: "",
    address: "",
    phone: "",
    email: "",
    delivery_fee: "",
  });
  const [formData, setFormData] = useState({
    id: "",
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
      "id",
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
        setStore(data);
        // Atualize formData após setStore ser chamado
        setFormData({
          id: data.id,
          namestore: data.namestore,
          opening_hours: data.opening_hours,
          closing_hours: data.closing_hours,
          identificadorexterno: data.identificadorexterno,
          address: data.address,
          phone: data.phone,
          email: data.email,
          delivery_fee: data.delivery_fee,
        });
      } catch (error) {
        console.error("Erro ao carregar loja:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [identificadorexterno]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevStore) => ({ ...prevStore, [name]: value }));
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
      const filteredData = filterFormData(formData);
      await updateLoja(filteredData.id, filteredData);
      window.addToast("Ação realizada com sucesso!", "success");
      navigate(-1);
    } catch (error) {
      console.error("Erro ao atualizar loja:", error);
      window.addToast("Ocorreu um erro ao editar loja: " + error, "error");
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
          <TextField label="Nome da Loja" name="namestore" fullWidth value={formData.namestore} onChange={handleChange} required />
          <Stack direction="row" spacing={2}>
            <TextField
              label="Horário de Abertura"
              name="opening_hours"
              value={formData.opening_hours}
              onChange={handleChange}
              sx={{ flex: 1 }}  // Controla a largura
            />
            <TextField
              label="Horário de Fechamento"
              name="closing_hours"
              value={formData.closing_hours}
              onChange={handleChange}
              sx={{ flex: 1 }}  // Controla a largura
            />
          </Stack>
          <TextField label="Identificador Externo" name="identificadorexterno" fullWidth value={formData.identificadorexterno} onChange={handleChange} required />
          <TextField label="Endereço" name="address" fullWidth value={formData.address} onChange={handleChange} />
          <TextField label="Telefone" name="phone" fullWidth value={formData.phone} onChange={handleChange} required />
          <TextField label="E-mail" name="email" fullWidth value={formData.email} onChange={handleChange} />
        </Stack>

        <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
          <Button variant="contained" color="success" onClick={handleSubmit}>Salvar</Button>
        </Box>
      </Container>
    </C.Container>
  );
};

export default EditarLoja;
