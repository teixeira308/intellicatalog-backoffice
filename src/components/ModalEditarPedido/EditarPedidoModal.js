import React, { useState, useEffect } from "react";
import * as C from "./styles";
import pedidoApi from "../../services/PedidoApi";
import { NumericFormat } from 'react-number-format';
import "./styles.css"

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
      onEdit();
    } catch (error) {
      console.error("Erro ao editar pedido:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Editar Pedido #{formData.id}</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalForm onSubmit={handleSubmit}>
           
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="payment_method">Método de pagamento</C.Label>
              <C.Input
                type="text"
                name="payment_method"
                id="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
                required
              />
            </C.FormColumn>
            <C.FormColumn>
              <C.Label htmlFor="phone">Cliente - Telefone</C.Label>
              <C.Input
                type="text"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="delivery_address">Endereço</C.Label>
              <C.Input
                type="text"
                name="delivery_address"
                id="delivery_address"
                value={formData.delivery_address}
                onChange={handleChange}
              />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="notes">Notas</C.Label>
              <C.Textarea
                name="notes"
                id="notes"
                value={formData.notes}
                onChange={handleChange}
                maxLength={500} // Limita a 100 caracteres
                rows={10} // Define o número de linhas visíveis
                placeholder="Digite sua descrição aqui..."
              />
            </C.FormColumn>
          </C.FormRow>
          <C.Button type="submit">Salvar</C.Button>
        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default EditarPedidoModal;
