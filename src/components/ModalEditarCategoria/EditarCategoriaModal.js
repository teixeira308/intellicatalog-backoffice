import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import categoriaApi from "../../services/categoriaApi";

const EditarCategoriaModal = ({ isOpen, onClose, categoria, onEdit }) => {
  const { updateCategoria } = categoriaApi();
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const filterFormData = (data) => {
    // Campos permitidos
    const allowedFields = ['name', 'description'];
    return Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );
  };

  useEffect(() => {
    if (categoria) {
      setFormData(categoria);
    }
  }, [categoria]);

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
      await updateCategoria(categoria.id, filteredData);
      window.addToast("Ação realizada com sucesso!", "success");
      onEdit();
      onClose();
    } catch (error) {
      console.error("Erro ao editar categoria:", error);
      window.addToast("Ocorreu um erro ao editar categoria: " + error, "error");
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
        <Typography variant="h6" mb={2}>Editar Categoria</Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Descrição"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={onClose} variant="outlined" color="error" sx={{ mr: 2 }}>Cancelar</Button>
            <Button type="submit" color="success" variant="contained">Salvar</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditarCategoriaModal;
