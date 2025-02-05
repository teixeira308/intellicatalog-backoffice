import React, { useState, useEffect } from "react";
import * as C from "./styles";
import categoriaApi from "../../services/categoriaApi";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";

const DeleteCategoriaModal = ({ isOpen, onClose, categoria, onDelete }) => {
  const { updateCategoria } = categoriaApi();
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const filterFormData = (data) => {
    // Campos permitidos
    const allowedFields = [
      'name',
      'description'
    ];

    // Filtra os dados mantendo apenas os campos permitidos
    return Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );
  };

  useEffect(() => {
    if (categoria) {
      setFormData(categoria);
    }
  }, [categoria]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const filteredData = filterFormData(formData);
      
      onDelete();
      window.addToast("Ação realizada com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao editar categoria:", error);
      window.addToast("Ocorreu um erro ao editar categoria: "+error, "error");
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Deletar Categoria</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Deseja realmente excluir a categoria {formData.name}?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit} 
          color="error" variant="contained" 
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCategoriaModal;
