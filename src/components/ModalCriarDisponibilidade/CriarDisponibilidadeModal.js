import React, { useState, useEffect } from "react";
import * as C from "./styles";
import servicesApi from "../../services/ServicesApi";
import avaliabilityApi from "../../services/disponibilidadeApi";
import { NumericFormat } from 'react-number-format';

const CriarDisponibilidadeModal = ({ isOpen, onClose, onCreate }) => {
  const { getServicesByUser } = servicesApi();
  const { createAvailability } = avaliabilityApi();
  const [servicoAtual, setServicoAtual] = useState(null);
  const [servicos, setServicos] = useState([]);
  const [formData, setFormData] = useState({
    service_id: "",
    date: "",
    start_time: "",
    end_time: ""
  });

  const filterFormData = (data) => {
    // Campos permitidos
    const allowedFields = [
      'service_id',
      'date',
      'start_time',
      'end_time',
    ];

    // Filtra os dados mantendo apenas os campos permitidos
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );
    return filteredData;
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const services = await getServicesByUser();
        if (services) {
          setServicos(services);
          if (!servicoAtual) {
            setServicoAtual(services[0]?.id);
          }
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

  const resetFormData = () => {
    setFormData({
      service_id: "",
      date: "",
      start_time: "",
      end_time: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const filteredData = filterFormData(formData);
      await createAvailability(filteredData);
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

  const handleChangeServico = (event) => {
    setServicoAtual(event.target.value);
  };

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
              <C.Label htmlFor="name">Data</C.Label>
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
            <C.Label htmlFor="name">Data</C.Label>
              <C.Select onChange={handleChangeServico} value={servicoAtual} name="service_id" id="service_id">
                {servicos.map(servico => (
                  <C.Option key={servico.id} value={servico.id}>{servico.name}</C.Option>
                ))}
              </C.Select>
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="start_time">Horario inicial</C.Label>
              <C.Input
                type="text"
                name="start_time"
                id="start_time"
                value={formData.start_time}
                onChange={handleChange}
                placeholder="00:00"
                required
              />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="end_time">Horario final</C.Label>
              <C.Input
                type="text"
                name="end_time"
                id="end_time"
                value={formData.end_time}
                onChange={handleChange}
                placeholder="00:00"
                required
              />
            </C.FormColumn>
          </C.FormRow>
          <C.Button type="submit">Salvar</C.Button>
        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default CriarDisponibilidadeModal;
