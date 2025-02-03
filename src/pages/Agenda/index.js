import React, { useState, useEffect } from "react";
import * as C from "./style";
import Navbar from "../../components/Navbar/Navbar";
import DisponibilidadeApi from "../../services/disponibilidadeApi";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

const Agenda = () => {
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [mesAtual, setMesAtual] = useState(dayjs().format("YYYY-MM")); // Formato: "2025-01"

  const { getAvailability } = DisponibilidadeApi();

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

  return (
    <>
      <Navbar />
      <C.Container>

        <C.Title>Agenda</C.Title>
        <C.Section>

          {/* Controles de Mês */}
          <C.MonthControls>
            <button onClick={mesAnterior}>← Mês Anterior</button>
            <span>{dayjs(mesAtual).format("MMMM YYYY")}</span>
            <button onClick={proximoMes}>Próximo Mês →</button>
          </C.MonthControls>

          <C.Step>
            <C.GridContainer>
              {disponibilidadesFiltradas.length > 0 ? (
                disponibilidadesFiltradas.map((availability, index) => (
                  <C.Card key={index}>
                    <C.Title>{dayjs(availability.date).format("DD")}</C.Title>
                  </C.Card>
                ))
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
