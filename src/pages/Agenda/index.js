import React, { useState, useEffect } from "react";
import * as C from "./style";
import Navbar from "../../components/Navbar/Navbar";
import DisponibilidadeApi from "../../services/disponibilidadeApi";
import ServicesApi from "../../services/ServicesApi";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { FaChevronLeft, FaChevronRight, FaPlusCircle } from 'react-icons/fa';

const Agenda = () => {
  dayjs.locale("pt-br");
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [servicoAtual, setServicoAtual] = useState(null);
  const [mesAtual, setMesAtual] = useState(dayjs().format("YYYY-MM"));
  const [datasVisiveis, setDatasVisiveis] = useState({});

  const { getAvailability } = DisponibilidadeApi();
  const { getServicesByUser } = ServicesApi();

  useEffect(() => {
    const fetchAvaliabilities = async () => {
      try {
        const availabilities = await getAvailability();
        if (availabilities && availabilities.data) {
          setDisponibilidades(availabilities.data);
        }
      } catch (error) {
        console.error("Erro ao carregar disponibilidades: ", error.message);
      }
    };

    fetchAvaliabilities();
  }, [servicoAtual]);

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

  const mesAnterior = () => {
    setMesAtual(dayjs(mesAtual).subtract(1, "month").format("YYYY-MM"));
  };

  const proximoMes = () => {
    setMesAtual(dayjs(mesAtual).add(1, "month").format("YYYY-MM"));
  };

  const handleChangeServico = (event) => {
    setServicoAtual(event.target.value);
  };

  const disponibilidadesFiltradas = disponibilidades.filter(availability =>
    dayjs(availability.date).format("YYYY-MM") === mesAtual &&
    availability.service_id == servicoAtual
  );

  const disponibilidadesAgrupadas = disponibilidadesFiltradas.reduce((acc, disponibilidade) => {
    const formattedDate = dayjs(disponibilidade.date).format("YYYY-MM-DD");

    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }

    acc[formattedDate].push(disponibilidade);
    return acc;
  }, {});

  const toggleVisibilidade = (data) => {
    setDatasVisiveis(prev => ({
      ...prev,
      [data]: !prev[data],
    }));
  };

  return (
    <>
      <Navbar />
      <C.Container>
        <C.Title>Agenda</C.Title>
        <C.ButtonGroup>
          <C.CreateButton>
            <FaPlusCircle /> Agendamento
          </C.CreateButton>
        </C.ButtonGroup>

        <C.Section>
          {/* Dropdown de Serviços */}
          <C.Select onChange={handleChangeServico} value={servicoAtual}>
            {servicos.map(servico => (
              <C.Option key={servico.id} value={servico.id}>{servico.name}</C.Option>
            ))}
          </C.Select>

          {/* Controles de Mês */}
          
          <C.MonthControls>
            <button onClick={mesAnterior}><FaChevronLeft /></button>
            <span>{dayjs(mesAtual).format("MMMM")}</span>
            <button onClick={proximoMes}><FaChevronRight /></button>
            <span>{dayjs(mesAtual).format("YYYY")}</span>
          </C.MonthControls>

          {/* Exibição dos horários disponíveis */}
          {Object.entries(disponibilidadesAgrupadas).length > 0 ? (
            Object.entries(disponibilidadesAgrupadas).map(([data, agendamentos]) => (
              <C.Step key={data}>
                <C.DateControls>
                  <C.DateLabel onClick={() => toggleVisibilidade(data)}>
                    <C.DateTitle>{dayjs(data).format("DD")}</C.DateTitle>
                  </C.DateLabel>
                  <C.CreateAgendaButton>
                    <FaPlusCircle /> Disponibilidade
                  </C.CreateAgendaButton>
                </C.DateControls>
                {datasVisiveis[data] && (
                  <C.TimeList>
                    {agendamentos.map((availability, index) => (
                      <C.Card key={index} status={availability.status}>
                        <p>{availability.start_time} - {availability.end_time}</p>
                      </C.Card>
                    ))}
                  </C.TimeList>
                )}
              </C.Step>
            ))
          ) : (
            <p>Nenhuma disponibilidade para este serviço neste mês.</p>
          )}
        </C.Section>
      </C.Container>
    </>
  );
};

export default Agenda;
