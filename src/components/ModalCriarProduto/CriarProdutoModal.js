import React, { useState, useEffect } from "react";
import * as C from "./styles";
import productApi from "../../services/productApi";
import { NumericFormat } from 'react-number-format';
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

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

  if (!isOpen) return null;

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
        <C.ModalHeader>
          <Typography variant="h6" mb={2}>Novo Produto</Typography>
        </C.ModalHeader>
        <C.ModalForm onSubmit={handleSubmit}>
        <Typography variant="h6" mb={2}>Categoria: {categoria.name}</Typography>
          
          

          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="name">Título</C.Label>
              <C.Input
                type="text"
                name="titulo"
                id="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
              />
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="description">Marca</C.Label>
              <C.Input
                type="text"
                name="brand"
                id="brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
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
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
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
              />
            </C.FormColumn>
            <C.FormColumn>
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
            <Button onClick={onClose} variant="outlined" sx={{ mr: 2 }}>Cancelar</Button>
            <Button type="submit" color="success" variant="contained">Salvar</Button>
          </Box>
        </C.ModalForm>
      </Box>
    </Modal>
  );
};

export default CriarProdutoModal;
