import React, { useState, useEffect } from "react";
import * as C from "./styles";
import pedidoApi from "../../services/PedidoApi";
import { NumericFormat } from 'react-number-format';
import "./styles.css"
import { Modal, Box, Typography, TextField, Button } from "@mui/material";


const EditarPedidoModal = ({ isOpen, onClose, pedido, onEdit }) => {
  const { updatePedido } = pedidoApi();
  const [formData, setFormData] = useState({
    payment_method: "",
    phone: "",
    delivery_address: "",
    notes: "",
    id: ""
  });

  const filterFormData = (data) => {
    // Campos permitidos
    const allowedFields = [
      'payment_method',
      'phone',
      'delivery_address',
      'notes',
      'id'
    ];

    // Filtra os dados mantendo apenas os campos permitidos
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );
    return filteredData;
  };



  useEffect(() => {
    if (pedido) {
      setFormData(pedido);
    }
  }, [pedido]);

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
      await updatePedido(pedido.id, filteredData);
      window.addToast("Ação realizada com sucesso!", "success");
      onEdit();
    } catch (error) {
      console.error("Erro ao editar pedido:", error);
      window.addToast("Ocorreu um erro ao editar pedido: " + error, "error");
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
          <Typography variant="h6" mb={2}>Editar Pedido #{formData.id}</Typography>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalForm onSubmit={handleSubmit}>

          <C.FormRow>
            <C.FormColumn>
              {/*}  <C.Label htmlFor="payment_method">Método de pagamento</C.Label>
              <C.Input
                type="text"
                name="payment_method"
                id="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
                required
              />{*/}

              <TextField
                label="Método de pagamento"
                name="payment_method"
                id="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
                fullWidth
                sx={{ marginRight: '10px' }}
              />

            </C.FormColumn>
            <C.FormColumn>
              {/*} <C.Label htmlFor="phone">Cliente - Telefone</C.Label>
              <C.Input
                type="text"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              /> {*/}

              <TextField
                label="Cliente - telefone"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                sx={{ marginRight: '10px' }}
              />
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
              {/*}   <C.Label htmlFor="delivery_address">Endereço</C.Label>
              <C.Input
                type="text"
                name="delivery_address"
                id="delivery_address"
                value={formData.delivery_address}
                onChange={handleChange}
              />
              {*/}
              <TextField
                label="Endereço"
                name="delivery_address"
                id="delivery_address"
                value={formData.delivery_address}
                onChange={handleChange}
                fullWidth
                sx={{ marginRight: '10px' }}
              />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              {/*}<C.Label htmlFor="notes">Notas</C.Label>
              <C.Textarea
                name="notes"
                id="notes"
                value={formData.notes}
                onChange={handleChange}
                maxLength={500} // Limita a 100 caracteres
                rows={10} // Define o número de linhas visíveis
                placeholder="Digite sua descrição aqui..."
              />
              {*/}
              <TextField
                label="Observação"
                name="notes"
                id="notes"
                value={formData.notes}
                onChange={handleChange}
                multiline
                rows={4} // Define a altura inicial
                inputProps={{ maxLength: 500 }} // Limita a 500 caracteres
                placeholder="Digite sua observação aqui..."
                fullWidth
                sx={{ mb: 2 }} // Adiciona margem inferior para espaçamento
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

export default EditarPedidoModal;
