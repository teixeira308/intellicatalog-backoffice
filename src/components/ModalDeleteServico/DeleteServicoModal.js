import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";

const DeletarServicoModal = ({ isOpen, onClose, servico, onDelete }) => {

  const [formData, setFormData] = useState({
    name: ""
  });

  const filterFormData = (data) => {
    // Campos permitidos
    const allowedFields = [
      'name'
    ];

    // Filtra os dados mantendo apenas os campos permitidos
    return Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );
  };

  useEffect(() => {
    if (servico) {
      setFormData(servico);
    }
  }, [servico]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const filteredData = filterFormData(formData);
      onDelete();
      window.addToast("Ação realizada com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao deletar serviço:", error);
      window.addToast("Ocorreu um erro ao deletar serviço: " + error, "error");
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Deletar Serviço</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Deseja realmente excluir o serviço <br />
          <strong>{formData.name}</strong>?
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

export default DeletarServicoModal;
