import React, { useState, useEffect } from "react";
import * as C from "./styles";
import lojaApi from "../../services/lojaApi";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

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
    delivery_fee: ""
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
      window.addToast("Ação realizada com sucesso!", "success");
      onEdit();
    } catch (error) {
      console.error("Erro ao editar loja:", error);
      window.addToast("Ocorreu um erro ao editar loja: " + error, "error");
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
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{
        width: 400,
        margin: 'auto',
        padding: 3,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <C.ModalHeader>
          <Typography variant="h6" mb={2}>Editar Minha Loja</Typography>
        </C.ModalHeader>
        <C.ModalForm onSubmit={handleSubmit}>
          <C.FormRow>
            <C.FormColumn>
              <TextField
                label="Nome"
                name="namestore"
                id="namestore"
                value={formData.namestore}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
                required
              />
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
      

              <TextField
                label="Horario Abertura"
                name="opening_hours"
                id="opening_hours"
                value={formData.opening_hours}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
            </C.FormColumn>

            <C.FormColumn>

              <TextField
                label="Horario fechamento"
                name="closing_hours"
                id="closing_hours"
                value={formData.closing_hours}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />

            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
              <TextField
                label="Identificador Externo"
                name="identificadorexterno"
                id="identificadorexterno"
                value={formData.identificadorexterno}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
                required
              />

            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
              
              <TextField
                label="Endereço"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
              <TextField
                label="E-mail"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
             
          <TextField
                label="Telefone/Whatsapp contato"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
                required
              />

            </C.FormColumn>

          </C.FormRow>
           <Box display="flex" justifyContent="flex-end">
            <Button onClick={onClose} variant="outlined" color="error" sx={{ mr: 2 }}>Cancelar</Button>
            <Button type="submit" color="success" variant="contained">Salvar</Button>
          </Box>
        </C.ModalForm>
      </Box>
    </Modal>
  );
};

export default EditarLojaModal;
