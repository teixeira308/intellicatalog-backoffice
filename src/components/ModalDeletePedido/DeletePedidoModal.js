import React, { useState, useEffect } from "react";
import * as C from "./styles";

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
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Deletar Pedido</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalForm onSubmit={handleSubmit}>
          <C.FormRow>
            <C.FormColumn>
              <p>Deseja realmente excluir o pedido <br/><C.Label> {formData.id} </C.Label>?</p>
              
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

export default DeletarPedidoModal;
