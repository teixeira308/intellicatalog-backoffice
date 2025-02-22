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
import productApi from "../../services/productApi";

const EditarProduto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);

  const { getProduct, updateProduto } = productApi();

  const filterFormData = (data) => {
    // Campos permitidos
    const allowedFields = [
      'titulo',
      'brand',
      'description',
      'price',
      'unit',
      'unitquantity',
      'promocional_price'
    ];

    // Filtra os dados mantendo apenas os campos permitidos
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );

    // Verifica se promocional_price é uma string vazia e a redefine para null
    if (filteredData.promocional_price === '') {
      filteredData.promocional_price = null;
    }

    return filteredData;
  };
  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const data = await getProduct(id);
        setProduto(data);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduto();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredData = filterFormData(produto);
    try {
      await updateProduto(id, filteredData);
      window.addToast("Ação realizada com sucesso!", "success");
      navigate(-1);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      window.addToast("Ocorreu um erro ao editar produto: " + error, "error");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!produto) return <p>Produto não encontrado.</p>;

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

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Título"
              name="titulo"
              value={produto.titulo || ""}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Marca"
              name="brand"
              value={produto.brand || ""}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Descrição"
              name="description"
              value={produto.description || ""}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
            />
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <TextField
              label="Preço"
              name="price"
              type="number"
              value={produto.price || ""}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Preço Promocional"
              name="promocional_price"
              type="number"
              value={produto.promocional_price || ""}
              onChange={handleChange}
              fullWidth
            /></Box>
           
           
           
            <Button type="submit" variant="contained" color="primary">
              Salvar Alterações
            </Button>
          </Stack>
        </form>
      </Container>
    </C.Container>
  );
};

export default EditarProduto;
