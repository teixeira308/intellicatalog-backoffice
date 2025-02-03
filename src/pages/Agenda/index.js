import React, { useState, useEffect } from "react";
import * as C from "./style";
import Navbar from "../../components/Navbar/Navbar";
import DisponibilidadeApi from "../../services/disponibilidadeApi";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Ícone de lápis

const Agenda = () => {


  dayjs.locale("pt-br");
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [servicos, setServicos] = useState([]);

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


  // Filtrar disponibilidades para o mês atual
  const disponibilidadesFiltradas = disponibilidades.filter((availability) =>
    dayjs(availability.date).format("YYYY-MM") === mesAtual
  );

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



  return (
    <>
      <Navbar />
      <C.Container>

        <C.Title>Agenda</C.Title>
        <C.Section>

          {/* Controles de Mês */}
          <C.MonthControls>
            <button onClick={mesAnterior}><FaChevronLeft /></button>
            <span>{dayjs(mesAtual).format("MMMM YYYY")}</span>
            <button onClick={proximoMes}><FaChevronRight /></button>
          </C.MonthControls>

          <C.Step>
            <C.GridContainer>
              {Object.entries(disponibilidadesPorServico).length > 0 ? (
                Object.entries(disponibilidadesPorServico).map(([service_id, disponibilidades]) => {
                  const servico = servicosMap[service_id] || {}; // Obtém os detalhes do serviço

                  return (
                    <C.ServiceGroup key={service_id}>
                      <C.ServiceTitle>{servico.name || "Serviço Desconhecido"}</C.ServiceTitle>
                      {disponibilidades.map((availability, index) => (
                        <C.Card key={index} status={availability.status}>
                          <C.Title>{dayjs(availability.date).format("DD")}</C.Title>
                          <p>{availability.start_time} - {availability.end_time}</p>
                        </C.Card>
                      ))}
                    </C.ServiceGroup>
                  );
                })
              ) : (
                <p>Nenhuma disponibilidade para este mês.</p>
              )}
            </C.GridContainer>

          </C.Step>

        </C.Section>
      </C.Container>
    </>);
};

export default Agenda;
