import React, { useState, useEffect } from "react";
import * as C from "./styles";
import pedidoApi from "../../services/PedidoApi";

const MudarStatusPedidoModal = ({ isOpen, onClose, pedido, onEdit }) => {
  const { updatePedido } = pedidoApi();
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

  // Filtra os campos permitidos
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
      await updatePedido(filteredData.id,filteredData);
      window.addToast("Ação realizada com sucesso!", "success");
      onEdit();
      onClose(); // Fecha o modal após salvar
    } catch (error) {
      console.error("Erro ao editar pedido:", error);
      window.addToast("Ocorreu um erro ao realizar a ação: "+error, "error");
    }
  };

  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Avançar Status do Pedido #{formData.id}</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalForm onSubmit={handleSubmit}>
          <C.FormRow>
            <C.FormColumn>
              <label htmlFor="status">Novo status do Pedido:</label><br/>
              <C.Select
                name="status"
                id="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Selecione um status
                </option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </C.Select>
            </C.FormColumn>
          </C.FormRow>
          <C.Button type="submit">Salvar</C.Button>
        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default MudarStatusPedidoModal;
