import React, { useState, useEffect } from "react";
import * as C from "./styles";
import categoriaApi from "../../services/categoriaApi";

const EditarLojaModal = ({ isOpen, onClose, categoria, onEdit }) => {
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
      await updateCategoria(categoria.id, filteredData);
      window.addToast("Ação realizada com sucesso!", "success");
      onEdit();
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
          <h2>Editar Categoria</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalForm onSubmit={handleSubmit}>
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="name">Nome</C.Label>
              <C.Input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="description">Descrição</C.Label>
              <C.Input
                type="text"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
              />
            </C.FormColumn>
            </C.FormRow>
          <C.Button type="submit">Salvar</C.Button>
        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default EditarLojaModal;
