import React, { useState, useEffect } from "react";
import * as C from "./styles";

const DeletarItemPedidoModal = ({ isOpen, onClose, pedido, item, onDelete }) => {

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
    } catch (error) {
      console.error("Erro ao deletar pedido:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Deletar produto do Pedido </h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalForm onSubmit={handleSubmit}>
          <C.FormRow>
            <C.FormColumn>
              <p>Deseja realmente excluir o produto #{item.product_id} do Pedido #{pedido.id}?</p>
              
            </C.FormColumn>
          </C.FormRow>

          
            <C.FormRow>
          <C.Button type="submit">Excluir</C.Button>
          <C.CancelButton onClick={onClose}>Cancelar</C.CancelButton>
          </C.FormRow>
        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default DeletarItemPedidoModal;
