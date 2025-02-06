import React, { useState, useEffect } from "react";
import * as C from "./styles";
import pedidoApi from "../../services/PedidoApi";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const CriarPedidoModal = ({ isOpen, onClose, onCreate }) => {
  const { createPedido } = pedidoApi();
  const [formData, setFormData] = useState({
    phone: "",
    delivery_address: "",
    notes: "",
    payment_method: "",
    items: "",

  });

  const filterFormData = (data) => {
    // Campos permitidos
    const allowedFields = [
      'phone',
      'delivery_address',
      'notes',
      'payment_method',
      'items',
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
      phone: "",
      delivery_address: "",
      notes: "",
      payment_method: "",
      items: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const filteredData = filterFormData(formData);
      await createPedido(filteredData);
      window.addToast("Ação realizada com sucesso!", "success");
      resetFormData();
      onClose();
      onCreate();
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      window.addToast("Ocorreu um erro ao criar pedido: " + error, "error");
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

          <Typography variant="h6" mb={2}>Novo Pedido</Typography>


        </C.ModalHeader>
        <C.ModalForm onSubmit={handleSubmit}>
          <C.FormRow>
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
                label="Cliente - Telefone"
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
              {/*}<C.Label htmlFor="delivery_address">Endereço de entrega:</C.Label>
              <C.Input
                type="text"
                name="delivery_address"
                id="delivery_address"
                value={formData.delivery_address}
                onChange={handleChange}
              />{*/}
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
              {/*}<C.Label htmlFor="notes">Observações:</C.Label>
              <C.Textarea
                name="notes"
                id="notes"
                value={formData.notes}
                onChange={handleChange}
                maxLength={500} // Limita a 100 caracteres
                rows={4} // Define o número de linhas visíveis
                placeholder="Digite sua observação aqui..."
              /> {*/}

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
          <C.FormRow>

            <C.FormColumn>
              {/*} <C.Label htmlFor="payment_method">Método de pagamento:</C.Label>
              <C.Input
                type="text"
                name="payment_method"
                id="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
              />
{*/}
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
            <Button onClick={onClose} variant="outlined" color="error" sx={{ mr: 2 }}>Cancelar</Button>
            <Button type="submit" color="success" variant="contained">Salvar</Button>
          </Box>
        </C.ModalForm>
      </Box>
    </Modal>
  );
};

export default CriarPedidoModal;
