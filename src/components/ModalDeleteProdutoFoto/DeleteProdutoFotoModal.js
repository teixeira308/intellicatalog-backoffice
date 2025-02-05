import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";

const DeletarProdutoFotoModal = ({ isOpen, onClose, produto, onDelete }) => {

  const [formData, setFormData] = useState({
    titulo: ""
  });

  const filterFormData = (data) => {
    // Campos permitidos
    const allowedFields = [
      'titulo'
    ];

    // Filtra os dados mantendo apenas os campos permitidos
    return Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );
  };

  useEffect(() => {
    if (produto) {
      setFormData(produto);
    }
  }, [produto]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const filteredData = filterFormData(formData);
      onDelete();
      window.addToast("Ação realizada com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      window.addToast("Ocorreu um erro ao deletar produto: " + error, "error");
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Deletar Produto</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Deseja realmente excluir o produto <br />
          <strong>{formData.titulo}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit} 
          color="error" 
          variant="contained"
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletarProdutoFotoModal;
