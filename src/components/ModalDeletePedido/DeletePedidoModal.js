import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";

const DeletarPedidoModal = ({ isOpen, onClose, pedido, onDelete }) => {

  const [formData, setFormData] = useState({
    id: ""
  });

  const filterFormData = (data) => {
    // Campos permitidos
    const allowedFields = [
      'id'
    ];

    // Filtra os dados mantendo apenas os campos permitidos
    return Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );
  };

  useEffect(() => {
    if (pedido) {
      setFormData(pedido);
    }
  }, [pedido]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const filteredData = filterFormData(formData);
      
      onDelete();
      window.addToast("Ação realizada com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao deletar pedido:", error);
      window.addToast("Ocorreu um erro ao deletar pedido: "+ error, "error");
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Deletar Pedido</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Deseja realmente excluir o pedido <br />
          <strong>{formData.id}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit} 
          color="secondary" 
          variant="contained"
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletarPedidoModal;
