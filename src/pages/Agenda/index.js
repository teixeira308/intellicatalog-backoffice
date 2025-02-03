import React, { useState, useEffect } from "react";
import * as C from "./style";
import Navbar from "../../components/Navbar/Navbar";
import DisponibilidadeApi from "../../services/disponibilidadeApi";
import ServicesApi from "../../services/ServicesApi";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Ícone de lápis

const Agenda = () => {


  dayjs.locale("pt-br");
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [servicoAtual, setServicoAtual] = useState(null);


  const [mesAtual, setMesAtual] = useState(dayjs().format("YYYY-MM")); // Formato: "2025-01"

  const { getAvailability } = DisponibilidadeApi();
  const { getServicesByUser, deleteServices, updateServiceOrder, updateServiceStatus } = ServicesApi();

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
  }, []);

  useEffect(() => {
    if (servicos.length > 0 && servicoAtual === null) {
      setServicoAtual(servicos[0].id); // Seleciona o primeiro serviço
    }
  }, [servicos]);


  useEffect(() => {
    const fetchServices = async () => {
      try {
        const services = await getServicesByUser();
        if (services) {
          setServicos(services);
        }
      } catch (error) {
        console.error("Erro ao carregar serviços:", error.message);
      }
    };

    fetchServices();
  }, []);




  // Mudar para o mês anterior
  const mesAnterior = () => {
    setMesAtual(dayjs(mesAtual).subtract(1, "month").format("YYYY-MM"));
  };

  // Mudar para o próximo mês
  const proximoMes = () => {
    setMesAtual(dayjs(mesAtual).add(1, "month").format("YYYY-MM"));
  };

  const disponibilidadesPorServico = disponibilidadesFiltradas.reduce((acc, disponibilidade) => {
    const { service_id } = disponibilidade;

    if (!acc[service_id]) {
      acc[service_id] = [];
    }

    acc[service_id].push(disponibilidade);
    return acc;
  }, {});

  const servicosMap = servicos.reduce((acc, servico) => {
    acc[servico.id] = servico; // Associa cada service_id ao seu objeto de serviço
    return acc;
  }, {});

  const disponibilidadesFiltradas = disponibilidades.filter(availability =>
    dayjs(availability.date).format("YYYY-MM") === mesAtual &&
    availability.service_id === servicoAtual
  );


  const servicoAnterior = () => {
    const index = servicos.findIndex(s => s.id === servicoAtual);
    if (index > 0) {
      setServicoAtual(servicos[index - 1].id);
    }
  };

  const proximoServico = () => {
    const index = servicos.findIndex(s => s.id === servicoAtual);
    if (index < servicos.length - 1) {
      setServicoAtual(servicos[index + 1].id);
    }
  };



  const disponibilidadesAgrupadas = disponibilidadesFiltradas.reduce((acc, disponibilidade) => {
    const formattedDate = dayjs(disponibilidade.date).format("YYYY-MM-DD");

    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }

    acc[formattedDate].push(disponibilidade);
    return acc;
  }, {});


  return (
    <>
    <Navbar />
    <C.Container>
      <C.Title>Agenda</C.Title>
      <C.Section>

        {/* Controles de Serviço */}
        <C.ServiceControls>
          <button onClick={servicoAnterior} disabled={servicos.findIndex(s => s.id === servicoAtual) === 0}>
            <FaChevronLeft />
          </button>
          <span>{servicosMap[servicoAtual]?.name || "Carregando..."}</span>
          <button onClick={proximoServico} disabled={servicos.findIndex(s => s.id === servicoAtual) === servicos.length - 1}>
            <FaChevronRight />
          </button>
        </C.ServiceControls>

        {/* Controles de Mês */}
        <C.Subtitle>{dayjs(mesAtual).format("YYYY")}</C.Subtitle>
        <C.MonthControls>
          <button onClick={mesAnterior}><FaChevronLeft /></button>
          <span>{dayjs(mesAtual).format("MMMM")}</span>
          <button onClick={proximoMes}><FaChevronRight /></button>
        </C.MonthControls>

        {/* Exibição dos horários disponíveis */}
        <C.Step>
          <C.GridContainer>
            {Object.entries(disponibilidadesAgrupadas).length > 0 ? (
              Object.entries(disponibilidadesAgrupadas).map(([data, agendamentos]) => (
                <C.DateGroup key={data}>
                  <C.DateTitle>{dayjs(data).format("DD [de] MMMM")}</C.DateTitle>

                  <C.TimeList>
                    {agendamentos.map((availability, index) => (
                      <C.Card key={index} status={availability.status}>
                        <p>{availability.start_time} - {availability.end_time}</p>
                      </C.Card>
                    ))}
                  </C.TimeList>
                </C.DateGroup>
              ))
            ) : (
              <p>Nenhuma disponibilidade para este serviço neste mês.</p>
            )}
          </C.GridContainer>
        </C.Step>

      </C.Section>
    </C.Container>
  </>);
};

export default Agenda;
