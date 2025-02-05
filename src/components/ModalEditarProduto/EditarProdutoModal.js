import React, { useState, useEffect } from "react";
import * as C from "./styles";
import productApi from "../../services/productApi";
import "./styles.css"
import { NumericFormat } from 'react-number-format';
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const EditarLojaModal = ({ isOpen, onClose, produto, categoria, onEdit }) => {
  const { updateProduto } = productApi();
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



  useEffect(() => {
    if (produto) {
      setFormData(produto);
    }
  }, [produto]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const filteredData = filterFormData(formData);
      await updateProduto(produto.id, filteredData);
      window.addToast("Ação realizada com sucesso!", "success");
      onEdit();
    } catch (error) {
      console.error("Erro ao editar produto:", error);
      window.addToast("Ocorreu um erro ao editar produto: " + error, "error");
    }
  };

  if (!isOpen) return null;

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
          <Typography variant="h6" mb={2}>Editar Produto</Typography>
        
        </C.ModalHeader>
        <C.ModalForm onSubmit={handleSubmit}>
          <C.FormRow>
            <C.FormColumn>
              <Typography variant="subtitle1" mb={2}>Categoria: {categoria.name}</Typography>
            </C.FormColumn>
          </C.FormRow>
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
                name="titulo"
                id="titulo"
                value={formData.titulo}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
              {/*}   <C.Label htmlFor="description">Marca</C.Label>
              <C.Input
                type="text"
                name="brand"
                id="brand"
                value={formData.brand}
                onChange={handleChange}
              />{*/}

              <TextField
                label="Marca"
                name="brand"
                id="brand"
                value={formData.brand}
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
                rows={10} // Define o número de linhas visíveis
                placeholder="Digite sua descrição aqui..."
              />
 {*/}
              <TextField
                label="Descrição"
                name="description"
                id="description"
                value={formData.description}
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
                className="NumericFormat"
                name="price"
                id="price"
                value={formData.price}
                onValueChange={(values) => {
                  const { formattedValue, value } = values;
                  setFormData((prev) => ({ ...prev, price: value })); // Atualiza o estado com o valor numérico
                }}
                thousandSeparator={true}
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={'R$ '}
                placeholder="0,00" // Placeholder para o formato esperado
              />
{*/}
              <NumericFormat
                customInput={TextField}
                label="Preço"
                name="price"
                id="price"
                value={formData.price}
                onValueChange={(values) => {
                  const { value } = values; // Obtém o valor numérico
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    price: value, // Atualiza o valor no formData
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
              <C.Label htmlFor="promocional_price">Preço promocional</C.Label>
              <NumericFormat
                className="NumericFormat"
                name="promocional_price"
                id="promocional_price"
                value={formData.promocional_price}
                onValueChange={(values) => {
                  const { formattedValue, value } = values;
                  setFormData((prev) => ({ ...prev, promocional_price: value })); // Atualiza o estado com o valor numérico
                }}
                thousandSeparator={true}
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={'R$ '}
                placeholder="0,00" // Placeholder para o formato esperado
              /> {*/}

              <NumericFormat
                customInput={TextField}
                label="Preço promocional"
                name="promocional_price"
                id="promocional_price"
                value={formData.promocional_price}
                onValueChange={(values) => {
                  const { value } = values; // Obtém o valor numérico
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    promocional_price: value, // Atualiza o valor no formData
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
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={onClose} variant="outlined" color="error" sx={{ mr: 2 }}>Cancelar</Button>
            <Button type="submit" color="success" variant="contained">Salvar</Button>
          </Box>
        </C.ModalForm>
      </Box>
    </Modal>
  );
};

export default EditarLojaModal;
