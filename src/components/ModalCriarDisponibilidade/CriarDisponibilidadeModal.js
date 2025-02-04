import React, { useState, useEffect } from "react";
import * as C from "./styles";
import servicesApi from "../../services/ServicesApi";
import avaliabilityApi from "../../services/disponibilidadeApi";

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
    try {
      console.log("Enviando dados:", formData);
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
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Nova disponibilidade</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalForm onSubmit={handleSubmit}>
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="date">Data</C.Label>
              <C.Input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="service_id">Serviço</C.Label>
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
              </C.Select>
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="start_time">Horário inicial</C.Label>
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
              </C.Select>
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="end_time">Horário final</C.Label>
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
            </C.FormColumn>
          </C.FormRow>

          <C.Button type="submit">Salvar</C.Button>
        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default CriarDisponibilidadeModal;
