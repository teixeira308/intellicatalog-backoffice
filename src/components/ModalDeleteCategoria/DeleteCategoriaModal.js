import React, { useState, useEffect } from "react";
import * as C from "./styles";
import categoriaApi from "../../services/categoriaApi";

const EditarLojaModal = ({ isOpen, onClose, categoria, onDelete }) => {
  const { updateCategoria } = categoriaApi();
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const filterFormData = (data) => {
    // Campos permitidos
    const allowedFields = [
      'name',
      'description'
    ];

    // Filtra os dados mantendo apenas os campos permitidos
    return Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );
  };


  useEffect(() => {
    if (categoria) {
      setFormData(categoria);
    }
  }, [categoria]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const filteredData = filterFormData(formData);
      
      onDelete();
      window.addToast("Ação realizada com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao editar categoria:", error);
      window.addToast("Ocorreu um erro ao editar categoria: "+error, "error");
    }
  };

  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Deletar Categoria</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalForm onSubmit={handleSubmit}>
          <C.FormRow>
            <C.FormColumn>
              <C.Label>Deseja realmente excluir a categoria {formData.name}? </C.Label>
              
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

export default EditarLojaModal;
