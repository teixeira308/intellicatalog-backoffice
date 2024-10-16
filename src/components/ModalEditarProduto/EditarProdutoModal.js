import React, { useState, useEffect } from "react";
import * as C from "./styles";
import productApi from "../../services/productApi";

const EditarLojaModal = ({ isOpen, onClose, produto, categoria,onEdit }) => {
  const { updateProduto } = productApi();
  const [formData, setFormData] = useState({
    titulo: "",
    brand: "",
    description:"",
    price:"",
    unit:"",
    unitquantity:"",
  });

  const filterFormData = (data) => {
    // Campos permitidos
    const allowedFields = [
     'titulo',
      'brand',
      'description',
      'price',
      'unit',
      'unitquantity',
    ];

    // Filtra os dados mantendo apenas os campos permitidos
    return Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );
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
      await updateProduto(produto.id, filteredData);
      onEdit();
    } catch (error) {
      console.error("Erro ao editar produto:", error);
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
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Editar Produto</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalForm onSubmit={handleSubmit}>
        <C.FormRow>
            <C.FormColumn>
              <C.Label>Categoria: {categoria.name} </C.Label>
              
            </C.FormColumn>
          </C.FormRow>
        <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="name">titulo</C.Label>
              <C.Input
                type="text"
                name="titulo"
                id="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
              />
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="description">Marca</C.Label>
              <C.Input
                type="text"
                name="brand"
                id="brand"
                value={formData.brand}
                onChange={handleChange}
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
            <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="description">Preço</C.Label>
              <C.Input
                type="text"
                name="price"
                id="price"
                value={formData.price}
                onChange={handlePriceChange}
              />
            </C.FormColumn>
            </C.FormRow>
            <C.FormRow>
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
            </C.FormRow>
          <C.Button type="submit">Salvar</C.Button>
        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default EditarLojaModal;
