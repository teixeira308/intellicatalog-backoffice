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
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);

  const { getProduct, updateProduto } = productApi();

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
    try {
      await updateProduto(id, produto);
      alert("Produto atualizado com sucesso!");
      navigate(-1);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
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
            />
            <TextField
              label="Unidade"
              name="unit"
              value={produto.unit || ""}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Quantidade por Unidade"
              name="unitquantity"
              value={produto.unitquantity || ""}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Estoque"
              name="estoque"
              type="number"
              value={produto.estoque || ""}
              onChange={handleChange}
              fullWidth
            />
            <Select
              label="Status"
              name="status"
              value={produto.status || ""}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="ativo">Ativo</MenuItem>
              <MenuItem value="inativo">Inativo</MenuItem>
            </Select>
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
