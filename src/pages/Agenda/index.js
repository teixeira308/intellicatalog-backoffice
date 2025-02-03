import React, { useState, useEffect } from "react";
import * as C from "./style";
import Navbar from "../../components/Navbar/Navbar";
import DisponibilidadeApi from "../../services/disponibilidadeApi";
import ServicesApi from "../../services/ServicesApi";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { FaChevronLeft, FaChevronRight, FaPlusCircle} from 'react-icons/fa'; // Ícone de lápis

const Agenda = () => {
  dayjs.locale("pt-br");
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [servicoAtual, setServicoAtual] = useState(null);
  const [mesAtual, setMesAtual] = useState(dayjs().format("YYYY-MM")); // Formato: "2025-01"
  const [datasVisiveis, setDatasVisiveis] = useState({}); // Estado para controle de visibilidade das datas

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

  const mesAnterior = () => {
    setMesAtual(dayjs(mesAtual).subtract(1, "month").format("YYYY-MM"));
  };

  const proximoMes = () => {
    setMesAtual(dayjs(mesAtual).add(1, "month").format("YYYY-MM"));
  };

  const disponibilidadesFiltradas = disponibilidades.filter(availability =>
    dayjs(availability.date).format("YYYY-MM") === mesAtual &&
    availability.service_id === servicoAtual
  );

  const disponibilidadesAgrupadas = disponibilidadesFiltradas.reduce((acc, disponibilidade) => {
    const formattedDate = dayjs(disponibilidade.date).format("YYYY-MM-DD");

    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }

    acc[formattedDate].push(disponibilidade);
    return acc;
  }, {});

  // Função para alternar a visibilidade dos horários de uma data
  const toggleVisibilidade = (data) => {
    setDatasVisiveis(prev => ({
      ...prev,
      [data]: !prev[data], // Alterna o valor da data
    }));
  };

  return (
    <>
      <Navbar />
      <C.Container>
        <C.Title>Agenda</C.Title>
        <C.ButtonGroup>
        <C.CreateButton>
              <FaPlusCircle /> Disponibilidade
        </C.CreateButton>
        <C.CreateButton>
              <FaPlusCircle /> Agendamento
        </C.CreateButton>
        </C.ButtonGroup>
        <C.Section>
          {/* Controles de Serviço */}
          <C.ServiceControls>
            <button onClick={() => setServicoAtual(servicoAtual - 1)} disabled={servicoAtual === 0}>
              <FaChevronLeft />
            </button>
            <span>{servicos.find(s => s.id === servicoAtual)?.name || "Carregando..."}</span>
            <button onClick={() => setServicoAtual(servicoAtual + 1)} disabled={servicoAtual === servicos.length - 1}>
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

          {Object.entries(disponibilidadesAgrupadas).length > 0 ? (
            Object.entries(disponibilidadesAgrupadas).map(([data, agendamentos]) => (
              <C.Step key={data}>
                {/* Data é agora um botão que alterna a visibilidade */}
                <span onClick={() => toggleVisibilidade(data)}>
                  <C.DateTitle>{dayjs(data).format("DD")}</C.DateTitle>
                </span>

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
