import React, { useState, useEffect } from "react";
import * as C from "./styles";
import productApi from "../../services/productApi";
import { NumericFormat } from 'react-number-format';
import "./styles.css"

const EditarEstoqueProduto = ({ isOpen, onClose, produto, onEdit }) => {
  const { updateEstoqueProduto } = productApi();

  const [formData, setFormData] = useState({
    estoque: "",
  });

  const filterFormData = (data) => {
    // Campos permitidos
    const allowedFields = [
      'estoque',
    ];

    // Filtra os dados mantendo apenas os campos permitidos
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );



    return filteredData;
  };



  useEffect(() => {
    if (produto) {
      setFormData(produto);
    }
  }, [produto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value, // Atualiza somente o campo correspondente
    }));
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const filteredData = filterFormData(formData);
      await updateEstoqueProduto(produto.id, filteredData);
      onEdit();
    } catch (error) {
      console.error("Erro ao editar estoque produto:", error);
    }
  };

  const increaseQuantity = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      estoque: String(Number(prevFormData.estoque || 0) + 1), // Garante que estoque seja string
    }));
  };

  const decreaseQuantity = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      estoque: String(Math.max(Number(prevFormData.estoque || 0) - 1, 0)), // Garante que estoque seja string
    }));
  };



  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Editar Estoque Produto</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalForm onSubmit={handleSubmit}>
          <C.FormRow>
            <C.FormColumn>
              <C.Label>Produto: {produto.titulo} </C.Label>
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Button  type="button" variant="outline-secondary" onClick={decreaseQuantity}>-</C.Button>
              <C.Input
                type="text"
                name="estoque"
                id="estoque"
                value={formData.estoque || "0"} // Garante que seja string (usa "0" como fallback)
                onChange={handleChange}
                required
              />

              <C.Button  type="button" variant="outline-secondary" onClick={increaseQuantity}>+</C.Button>
            </C.FormColumn>
          </C.FormRow>
          <C.Button type="submit">Salvar</C.Button>
        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default EditarEstoqueProduto;
