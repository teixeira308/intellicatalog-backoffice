import React, { useState, useEffect } from "react";
import * as C from "./styles";
import productApi from "../../services/productApi";
import { NumericFormat } from 'react-number-format';
import { Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import "./styles.css";

const EditarEstoqueProduto = ({ isOpen, onClose, produto, onEdit }) => {
  const { updateEstoqueProduto } = productApi();

  useEffect(() => {
    if (produto) {
      setFormData({
        estoque: String(produto.estoque || "0"), // Garante que seja uma string
      });
    }
  }, [produto]);

  const [formData, setFormData] = useState({
    estoque: "",
  });

  const filterFormData = (data) => {
    // Campos permitidos
    const allowedFields = [
      'estoque',
    ];

    // Filtra os dados mantendo apenas os campos permitidos
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );

    return filteredData;
  };

  useEffect(() => {
    if (produto) {
      setFormData(produto);
    }
  }, [produto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value, // Atualiza somente o campo correspondente
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const filteredData = filterFormData(formData);
      await updateEstoqueProduto(produto.id, filteredData);
      window.addToast("Ação realizada com sucesso!", "success");
      onEdit();
    } catch (error) {
      console.error("Erro ao editar estoque produto:", error);
      window.addToast("Ocorreu um erro ao editar estoque produto: " + error, "error");
    }
  };

  const increaseQuantity = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      estoque: String(Number(prevFormData.estoque || 0) + 1), // Garante que estoque seja string
    }));
  };

  const decreaseQuantity = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      estoque: String(Math.max(Number(prevFormData.estoque || 0) - 1, 0)), // Garante que estoque seja string
    }));
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Atualizar Estoque</DialogTitle>
      <DialogContent>
        <Typography variant="body1">Produto: {produto.titulo}</Typography>
        <div style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
          <Button variant="contained" onClick={increaseQuantity} style={{ marginRight: "1rem" }}>+</Button>
          <TextField
            type="text"
            name="estoque"
            value={formData.estoque || "0"} // Garante que seja string
            onChange={handleChange}
            required
            variant="outlined"
            inputProps={{ style: { textAlign: 'center' } }}
          />
          <Button variant="contained" onClick={decreaseQuantity} style={{ marginLeft: "1rem" }}>-</Button>
        </div>
      </DialogContent>
      <DialogActions>
       
        <Button onClick={handleSubmit}   color="success" variant="contained" >Salvar</Button>
        <Button onClick={onClose}  variant="outlined" >Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarEstoqueProduto;
