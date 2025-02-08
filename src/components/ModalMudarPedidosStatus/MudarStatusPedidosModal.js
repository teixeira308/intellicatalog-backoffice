import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import pedidoApi from "../../services/PedidoApi";

const MudarStatusPedidoModal = ({ isOpen, onClose, pedido, onEdit }) => {
  const { updateStatusPedido } = pedidoApi();
  const [formData, setFormData] = useState({
    status: "",
    id: "",
  });

  const statusOptions = [
    "pendente",
    "confirmada",
    "enviada",
    "finalizada",
    "cancelado",
    "produzindo",
  ];

  const filterFormData = (data) => {
    const allowedFields = ["status", "id"];
    return Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );
  };

  useEffect(() => {
    if (pedido) {
      setFormData(pedido);
    }
  }, [pedido]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const filteredData = filterFormData(formData);
      await updateStatusPedido(filteredData.id, filteredData);
      window.addToast("Ação realizada com sucesso!", "success");
      onEdit();
      onClose(); // Fecha o modal após salvar
    } catch (error) {
      console.error("Erro ao editar pedido:", error);
      window.addToast("Ocorreu um erro ao realizar a ação: " + error, "error");
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Avançar Status do Pedido #{formData.id}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Selecionar Status</InputLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            label="Selecionar Status"
          >
            <MenuItem value="" disabled>
              Selecione um status
            </MenuItem>
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" variant="outlined">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="success" variant="contained">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MudarStatusPedidoModal;
