import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { NumericFormat } from 'react-number-format';
import productApi from "../../services/productApi";

const CriarProdutoModal = ({ isOpen, onClose, onCreate, categoria }) => {
  const { createProduto } = productApi();
  const [formData, setFormData] = useState({
    titulo: "",
    brand: "",
    description: "",
    price: "",
    unit: "",
    unitquantity: "",
    promocional_price: ""
  });

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
      titulo: "",
      brand: "",
      description: "",
      price: "",
      unit: "",
      unitquantity: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const filteredData = filterFormData(formData);
      await createProduto(filteredData, categoria.id);
      window.addToast("Ação realizada com sucesso!", "success");
      resetFormData();
      onClose();
      onCreate();
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      window.addToast("Ocorreu um erro ao criar produto: " + error, "error");
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{
        width: 400,
        margin: 'auto',
        padding: 3,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <Typography variant="h6" mb={2}>Novo Produto</Typography>

        <form onSubmit={handleSubmit}>
          <Typography variant="body1" mb={2}>Categoria: {categoria.name}</Typography>

          <TextField
            label="Título"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="Marca"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Descrição"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            maxRows={4}
            sx={{ mb: 2 }}
          />

          <NumericFormat
            label="Preço"
            name="price"
            value={formData.price}
            onValueChange={(values) => {
              const { value } = values;
              setFormData(prevFormData => ({
                ...prevFormData,
                price: value
              }));
            }}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={'R$ '}
            placeholder="R$ 0,00"
            fullWidth
            sx={{ mb: 2 }}
          />

          <NumericFormat
            label="Preço Promocional"
            name="promocional_price"
            value={formData.promocional_price}
            onValueChange={(values) => {
              const { value } = values;
              setFormData(prevFormData => ({
                ...prevFormData,
                promocional_price: value
              }));
            }}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={'R$ '}
            placeholder="R$ 0,00"
            fullWidth
            sx={{ mb: 2 }}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Salvar
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CriarProdutoModal;
