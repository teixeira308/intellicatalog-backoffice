import React, { useState, useEffect } from "react";
import * as C from "./styles";
import servicesApi from "../../services/ServicesApi";
import avaliabilityApi from "../../services/disponibilidadeApi";
import {
  Container,
  Typography,
  Button,
  Select,
  MenuItem,
  IconButton,
  Card,
  CardContent,
  Box,
  Stack,
  Paper,
  Modal,
  TextField
} from "@mui/material";


const CriarDisponibilidadeModal = ({ isOpen, onClose, onCreate }) => {
  const { getServicesByUser } = servicesApi();
  const { createAvailability } = avaliabilityApi();

  const [servicos, setServicos] = useState([]);
  const [formData, setFormData] = useState({
    service_id: "",
    date: "",
    start_time: "",
    end_time: ""
  });

  const resetFormData = () => {
    setFormData({
      service_id: "",
      date: "",
      start_time: "",
      end_time: ""
    });
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const services = await getServicesByUser();
        if (services && services.length > 0) {
          setServicos(services);
          setFormData((prev) => ({
            ...prev,
            service_id: services[0].id,
          }));
        }
      } catch (error) {
        console.error("Erro ao carregar serviços:", error.message);
      }
    };

    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeServico = (event) => {
    setFormData({
      ...formData,
      service_id: event.target.value,
    });
  };

  const handleChangeHorario = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      start_time: formData.start_time || "00:00",
      end_time: formData.end_time || "00:00",
    };
    try {
      await createAvailability(formData);
      window.addToast("Ação realizada com sucesso!", "success");
      resetFormData();
      onClose();
      onCreate();
    } catch (error) {
      console.error("Erro ao criar disponibilidade:", error);
      window.addToast("Ocorreu um erro ao realizar a ação: " + error, "error");
    }
  };

  if (!isOpen) return null;

  const horarios = Array.from({ length: 24 }, (_, i) => {
    const hora = i.toString().padStart(2, "0");
    return `${hora}:00`;
  });

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

          <Typography variant="h6" mb={2}>Nova disponibilidade</Typography>

        </C.ModalHeader>
        <C.ModalForm onSubmit={handleSubmit}>
          <C.FormRow>
            <C.FormColumn>
              <TextField
                label="Data"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
              {/*}  <C.Label htmlFor="service_id">Serviço</C.Label>
              <C.Select
                onChange={handleChangeServico}
                value={formData.service_id}
                name="service_id"
                id="service_id"
              >
                {servicos.map(servico => (
                  <C.Option key={servico.id} value={servico.id}>
                    {servico.name}
                  </C.Option>
                ))}
              </C.Select> {*/}


              <Select
                value={formData.service_id}
                onChange={handleChange}
                name="service_id"
                fullWidth
                sx={{ mb: 2 }}
              >
                {servicos.map(servico => (
                  <MenuItem key={servico.id} value={servico.id}>
                    {servico.name}
                  </MenuItem>
                ))}
              </Select>
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
              {/*}  <C.Label htmlFor="start_time">Horário inicial</C.Label>
              <C.Select
                name="start_time"
                id="start_time"
                value={formData.start_time}
                onChange={handleChangeHorario}
              >
                {horarios.map((hora) => (
                  <C.Option key={hora} value={hora}>
                    {hora}
                  </C.Option>
                ))}
              </C.Select>{*/}
 <InputLabel id="label-horario-inicial">Inicio</InputLabel>
              <Select
              labelId="label-horario-inicial"
                
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              >
                {horarios.map((hora) => (
                  <MenuItem key={hora} value={hora}>{hora}</MenuItem>
                ))}
              </Select>
            </C.FormColumn>

            <C.FormColumn>
              {/*}  <C.Label htmlFor="end_time">Horário final</C.Label>
              <C.Select
                name="end_time"
                id="end_time"
                value={formData.end_time}
                onChange={handleChangeHorario}
              >
                {horarios.map((hora) => (
                  <C.Option key={hora} value={hora}>
                    {hora}
                  </C.Option>
                ))}
              </C.Select>
 {*/}
              <InputLabel id="label-horario">Fim</InputLabel>
              <Select
                labelId="label-horario-final"
                name="end_time"

                value={formData.end_time}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              >
                {horarios.map((hora) => (
                  <MenuItem key={hora} value={hora}>{hora}</MenuItem>
                ))}
              </Select>
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

export default CriarDisponibilidadeModal;
