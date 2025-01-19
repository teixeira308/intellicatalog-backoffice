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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
    formData.estoque= formData.estoque + 1;
  };

  const decreaseQuantity = () => {
    if (formData.estoque > 1) {
      formData.estoque= formData.estoque - 1;
    }
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
              <C.Label htmlFor="estoque">Estoque</C.Label>
              <C.Button variant="outline-secondary" onClick={decreaseQuantity(formData.estoque)}>-</C.Button>
              <C.Input
                type="text"
                name="estoque"
                id="estoque"
                value={formData.estoque}
                onChange={handleChange}
                required
              />
            </C.FormColumn>

        
            <C.Button variant="outline-secondary" onClick={increaseQuantity(formData.estoque)}>+</C.Button>
          </C.FormRow>
          <C.Button type="submit">Salvar</C.Button>
        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default EditarEstoqueProduto;
