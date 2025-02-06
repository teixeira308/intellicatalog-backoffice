import React, { useState, useEffect } from "react";
import * as C from "./styles";
import servicesApi from "../../services/ServicesApi";
import { NumericFormat } from 'react-number-format';
import "./styles.css"
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const EditarServicoModal = ({ isOpen, onClose, servico, onEdit }) => {
  const { updateService } = servicesApi();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: ""
  });

  const filterFormData = (data) => {
    // Campos permitidos
    const allowedFields = [
      'name',
      'description',
      'price'
    ];

    // Filtra os dados mantendo apenas os campos permitidos
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );

    return filteredData;
  };



  useEffect(() => {
    if (servico) {
      setFormData(servico);
    }
  }, [servico]);

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
      console.log(servico.id)
      await updateService(servico.id, filteredData);
      window.addToast("Ação realizada com sucesso!", "success");
      onEdit();
    } catch (error) {
      console.error("Erro ao editar serviço:", error);
      window.addToast("Ocorreu um erro ao editar serviço: " + error, "error");
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

          <Typography variant="h6" mb={2}>Editar Serviço</Typography>

        </C.ModalHeader>
        <C.ModalForm onSubmit={handleSubmit}>
          <C.FormRow>
            <C.FormColumn>
              {/*} <C.Label htmlFor="name">Nome</C.Label>
              <C.Input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />{*/}
              <TextField
                label="Nome"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
             {/*}  <C.Label htmlFor="description">Descrição</C.Label>
              <C.Input
                type="text"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
              /> {*/}
                <TextField
                label="Descrição"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
               {/*}<C.Label htmlFor="price">Preço</C.Label>
              <NumericFormat
                className="NumericFormat"
                name="price"
                id="price"
                value={formData.price}
                onValueChange={(values) => {
                  const { formattedValue, value } = values;
                  setFormData((prev) => ({ ...prev, price: value })); // Atualiza o estado com o valor numérico
                }}
                thousandSeparator={true}
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={'R$ '}
                placeholder="0,00" // Placeholder para o formato esperado
              />{*/}
               <NumericFormat
                              customInput={TextField}
                              label="Preço"
                              name="price"
                              id="price"
                              value={formData.price}
                              onValueChange={(values) => {
                                const { value } = values; // Obtém o valor numérico
                                setFormData((prevFormData) => ({
                                  ...prevFormData,
                                  price: value, // Atualiza o valor no formData
                                }));
                              }}
                              thousandSeparator="."
                              decimalSeparator=","
                              decimalScale={2}
                              fixedDecimalScale
                              prefix="R$ "
                              placeholder="R$ 0,00"
                              fullWidth
                              sx={{ mb: 2 }} // Espaçamento inferior
                            />
            </C.FormColumn>
          </C.FormRow>
          {/*} <C.FormRow>
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
            </C.FormRow>{*/}
          <Box display="flex" justifyContent="flex-end">
                      <Button onClick={onClose} variant="outlined" color="error" sx={{ mr: 2 }}>Cancelar</Button>
                      <Button type="submit" color="success" variant="contained">Salvar</Button>
                    </Box>
        </C.ModalForm>
      </Box>
    </Modal>
  );
};

export default EditarServicoModal;
