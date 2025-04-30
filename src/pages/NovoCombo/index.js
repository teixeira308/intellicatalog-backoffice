import React, { useState, useEffect } from "react";
import * as C from "./styles";
import { NumericFormat } from 'react-number-format';
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, TextField, Button, IconButton, Container } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import categoriaApi from "../../services/categoriaApi";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import comboApi from "../../services/comboApi";
import { List, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalProdutos from "../../components/ModalProdutos/ProdutosModal";
import comboProdutoApi from '../../services/comboProdutoApi';

const NovoCombo = () => {
  const { createCombo } = comboApi();
  const { getCategoria } = categoriaApi();
  const { addProdutoAoCombo } = comboProdutoApi();
  const navigate = useNavigate();
  const { IdCategoria } = useParams();
  const [categoria, setCategoria] = useState([]);
  const [comboId, setComboId] = useState();
  const [formData, setFormData] = useState({
    nome: "",
    preco: "",
    category_id: "",
    promocional_price: "",
    descricao: "",
    marca: ""
  });
  const [produtosDoCombo, setProdutosDoCombo] = useState([]);
  const [comboCriado, setComboCriado] = useState(false);

  const adicionarProdutoAoCombo = (produto) => {
    if (!produtosDoCombo.some(p => p.id === produto.id)) {
      setProdutosDoCombo(prev => [...prev, produto]);
    }
  };

  const removerProdutoDoCombo = (produtoId) => {
    setProdutosDoCombo(prev => prev.filter(p => p.id !== produtoId));
  };


  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategoria(IdCategoria);
        setCategoria(data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };
    fetchCategorias()
  }, []);

  const filterFormData = (data) => {
    // Campos permitidos
    const allowedFields = [
      'nome',
      'preco',
      'category_id',
      'promocional_price',
      'descricao',
      'marca'
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


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetFormData = () => {
    setFormData({
      nome: "",
      preco: "",
      category_id: "",
      promocional_price: "",
      descricao: "",
      marca: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const filteredData = filterFormData(formData);
      const createdCombo = await createCombo(filteredData, categoria.id);
      window.addToast("Ação realizada com sucesso!", "success");
      resetFormData();
      setComboId(createdCombo.id); // Agora funciona
      setComboCriado(true);
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      window.addToast("Ocorreu um erro ao criar produto: " + error, "error");
    }
  };

  const [openModalProdutos, setOpenModalProdutos] = useState(false);

  const abrirModalProdutos = () => {
    setOpenModalProdutos(true);
  };

  const handleFinalizarCombo = async () => {
    try {
      for (const produto of produtosDoCombo) {
        console.log('combo:',comboId)
        console.log('produto:',produto.id)
        await addProdutoAoCombo(comboId, produto.id);
      }
      window.addToast("Todos os produtos foram adicionados ao combo!", "success");
      navigate(-1); // ou redirecione para outro lugar
    } catch (error) {
      console.error("Erro ao finalizar combo:", error);
      window.addToast("Erro ao adicionar produtos ao combo", "error");
    }
  };


  const handlePriceChange = (e) => {
    let value = e.target.value;

    // Permite apenas números e um único ponto decimal
    value = value.replace(/[^0-9.]/g, '');

    // Garante que haja no máximo um ponto decimal
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts[1]; // Remove pontos extras
    }

    // Limita a quantidade de casas decimais a duas
    if (parts[1] && parts[1].length > 2) {
      value = `${parts[0]}.${parts[1].slice(0, 2)}`;
    }

    // Atualiza o valor no formData
    setFormData(prevFormData => ({
      ...prevFormData,
      price: value
    }));
  };

  const handleAddClick = async (produto) => {
    try {
      await addProdutoAoCombo(comboId, produto.id);
      window.addToast("Produto adicionado ao combo!", "success");
    } catch (error) {
      console.error("Erro ao adicionar produto ao combo:", error);
      window.addToast("Erro ao adicionar produto ao combo", "error");
    }
  };


  return (
    <C.Container>
      <Navbar />
      <IconButton onClick={() => navigate(-1)} sx={{ marginRight: "8px" }}>
        <ArrowBackIcon />
      </IconButton>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>

        <C.ModalHeader>
          <Typography variant="h6" mb={2}>Novo Combo</Typography>
        </C.ModalHeader>

        {!comboCriado ? (
          <>
            <C.ModalForm onSubmit={handleSubmit}>
              <Typography variant="subtitle1" mb={2}>Categoria: {categoria.name}</Typography>

              <C.FormRow>
                <C.FormColumn>
                  {/*} <C.Label htmlFor="name">Título</C.Label>
              <C.Input
                type="text"
                name="titulo"
                id="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
              /> {*/}
                  <TextField
                    label="Titulo"
                    name="nome"
                    id="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                  />
                </C.FormColumn>
              </C.FormRow>

              <C.FormRow>
                <C.FormColumn>
                  {/*}<C.Label htmlFor="brand">Marca</C.Label>
              <C.Input
                type="text"
                name="brand"
                id="brand"
                value={formData.brand}
                onChange={handleChange}
              />{*/}
                  <TextField
                    label="Marca"
                    name="marca"
                    id="marca"
                    value={formData.marca}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </C.FormColumn>
              </C.FormRow>
              <C.FormRow>
                <C.FormColumn>
                  {/*}
              <C.Label htmlFor="description">Descrição</C.Label>
              <C.Textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                maxLength={500} // Limita a 100 caracteres
                rows={4} // Define o número de linhas visíveis
                placeholder="Digite sua descrição aqui..."
              />
              {*/}
                  <TextField
                    label="Descrição"
                    name="descricao"
                    id="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    multiline
                    rows={4} // Define a altura inicial
                    inputProps={{ maxLength: 500 }} // Limita a 500 caracteres
                    placeholder="Digite sua descrição aqui..."
                    fullWidth
                    sx={{ mb: 2 }} // Adiciona margem inferior para espaçamento
                  />

                </C.FormColumn>
              </C.FormRow>
              <C.FormRow>
                <C.FormColumn>
                  {/*}
              <C.Label htmlFor="price">Preço</C.Label>
              <NumericFormat
                name="price"
                id="price"
                value={formData.price}
                onValueChange={(values) => {
                  const { value } = values; // Obtenha o valor numérico
                  setFormData(prevFormData => ({
                    ...prevFormData,
                    price: value // Atualiza o valor no formData
                  }));
                }}
                thousandSeparator={true}
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={'R$ '}
                placeholder="R$ 0,00" // Placeholder para o formato esperado
                style={{
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  width: '100%',
                }}
              /> {*/}
                  <NumericFormat
                    customInput={TextField}
                    label="Preço"
                    name="preco"
                    id="preco"
                    value={formData.preco}
                    onValueChange={(values) => {
                      const { value } = values; // Obtém o valor numérico
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        preco: value, // Atualiza o valor no formData
                      }));
                    }}
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    fixedDecimalScale
                    prefix="R$ "
                    placeholder="R$ 0,00"
                    fullWidth
                    sx={{ mb: 2 }} // Espaçamento inferior
                  />
                </C.FormColumn>
                <C.FormColumn>
                  {/*}
              <C.Label htmlFor="price">Preço promocional</C.Label>
              <NumericFormat
                name="promocional_price"
                id="promocional_price"
                value={formData.promocional_price}
                onValueChange={(values) => {
                  const { value } = values; // Obtenha o valor numérico
                  setFormData(prevFormData => ({
                    ...prevFormData,
                    promocional_price: value // Atualiza o valor no formData
                  }));
                }}
                thousandSeparator={true}
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={'R$ '}
                placeholder="R$ 0,00" // Placeholder para o formato esperado
                style={{
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  width: '100%',
                }}
              /> {*/}

                  <NumericFormat
                    customInput={TextField}
                    label="Preço promocional"
                    name="preco_promocional"
                    id="preco_promocional"
                    value={formData.preco_promocional}
                    onValueChange={(values) => {
                      const { value } = values; // Obtém o valor numérico
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        preco_promocional: value, // Atualiza o valor no formData
                      }));
                    }}
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    fixedDecimalScale
                    prefix="R$ "
                    placeholder="R$ 0,00"
                    fullWidth
                    sx={{ mb: 2 }} // Espaçamento inferior
                  />
                </C.FormColumn>
              </C.FormRow>
              {/*} <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="unit">Unidade</C.Label>
              <C.Input
                type="text"
                name="unit"
                id="unit"
                value={formData.unit}
                onChange={handleChange}
              />
            </C.FormColumn>
            <C.FormColumn>
              <C.Label htmlFor="unitquantity">Quantidade(un)</C.Label>
              <C.Input
                type="text"
                name="unitquantity"
                id="unitquantity"
                value={formData.unitquantity}
                onChange={handleChange}
              />
            </C.FormColumn>
            </C.FormRow> {*/}
              <Box display="flex" justifyContent="flex-end">
                <Button type="submit" color="success" variant="contained">Salvar</Button>
              </Box>
            </C.ModalForm>
          </>
        ) : (
          <Box mt={4}>
            <Typography variant="h6">Itens do Combo</Typography>

            <Button variant="outlined" onClick={abrirModalProdutos} sx={{ mt: 2 }}>
              Adicionar Produto
            </Button>

            <List>
              {produtosDoCombo.map((produto) => (
                <ListItem
                  key={produto.id}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => removerProdutoDoCombo(produto.id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={produto.titulo} secondary={`R$ ${produto.price}`} />
                </ListItem>
              ))}
            </List>
            <Button
              variant="contained"
              color="success"
              onClick={handleFinalizarCombo}
              sx={{ mt: 3 }}
            >
              Finalizar Combo
            </Button>

          </Box>
        )}

        <ModalProdutos
          isOpen={openModalProdutos}
          adicionarProdutoAoCombo={adicionarProdutoAoCombo}
          onClose={() => setOpenModalProdutos(false)}
        />



      </Container>
    </C.Container>
  );
};

export default NovoCombo;
