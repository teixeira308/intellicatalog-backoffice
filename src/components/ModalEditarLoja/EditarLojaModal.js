import React, { useState, useEffect } from "react";
import * as C from "./styles";
import lojaApi from "../../services/lojaApi";

const EditarLojaModal = ({ isOpen, onClose, loja, onEdit }) => {
  const { updateLoja } = lojaApi();
  const [formData, setFormData] = useState({
    namestore: "",
    opening_hours: "",
    closing_hours: "",
    identificadorexterno: "",
    address: "",
    phone: "",
    email: "",
    delivery_fee:""
  });

  const filterFormData = (data) => {
    // Campos permitidos
    const allowedFields = [
      'namestore',
      'opening_hours',
      'closing_hours',
      'identificadorexterno',
      'address',
      'email',
      'phone',
      'delivery_fee'
    ];

    // Filtra os dados mantendo apenas os campos permitidos
    return Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );
  };


  useEffect(() => {
    if (loja) {
      setFormData(loja);
    }
  }, [loja]);

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
      await updateLoja(loja.id, filteredData);
      onEdit();
    } catch (error) {
      console.error("Erro ao editar loja:", error);
    }
  };

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
      delivery_fee: value
    }));
  };

  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Editar Minha Loja</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalForm onSubmit={handleSubmit}>
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="namestore">Nome</C.Label>
              <C.Input
                type="text"
                name="namestore"
                id="namestore"
                value={formData.namestore}
                onChange={handleChange}
                required
              />
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="opening_hours">Horario Abertura</C.Label>
              <C.Input
                type="text"
                name="opening_hours"
                id="opening_hours"
                value={formData.opening_hours}
                onChange={handleChange}
              />
            </C.FormColumn>

            <C.FormColumn>
              <C.Label htmlFor="rg">Horario fechamento</C.Label>
              <C.Input
                type="text"
                name="closing_hours"
                id="closing_hours"
                value={formData.closing_hours}
                onChange={handleChange}
              />
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="identificadorexterno">Identificador Externo</C.Label>
              <C.Input
                type="text"
                name="identificadorexterno"
                id="identificadorexterno"
                value={formData.identificadorexterno}
                onChange={handleChange}
              />
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="address">
                Endereço
              </C.Label>
              <C.Input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
              />
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="email">E-mail</C.Label>
              <C.Input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="phone">Telefone</C.Label>
              <C.Input
                type="text"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </C.FormColumn>

          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="delivery_fee">Taxa de entrega</C.Label>
              <C.Input
                type="text"
                name="delivery_fee"
                id="delivery_fee"
                value={formData.delivery_fee}
                onChange={handlePriceChange}
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
