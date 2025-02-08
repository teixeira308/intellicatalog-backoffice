import React, { useState, useEffect } from "react";
import * as C from "./style";
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
  Grid
} from "@mui/material";
import { FaChevronLeft, FaChevronRight, FaPlusCircle } from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";
import DisponibilidadeApi from "../../services/disponibilidadeApi";
import ServicesApi from "../../services/ServicesApi";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import CriarDisponibilidadeModal from "../../components/ModalCriarDisponibilidade/CriarDisponibilidadeModal";
import DetalhesAgendamentoModal from "../../components/ModalDetalhesAgendamento/DetalhesAgendamentoModal"

dayjs.locale("pt-br");

const Agenda = () => {
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [servicos, setServicos] = useState([]); 
  const [servicoAtual, setServicoAtual] = useState(null);
  const [mesAtual, setMesAtual] = useState(dayjs().format("YYYY-MM"));
  const [datasVisiveis, setDatasVisiveis] = useState({});
  const [isCriarDisponibilidadeModalOpen, setIsCriarDisponibilidadeModalOpen] = useState(false);
  const [isDetalheAgendamentoeModalOpen, setIsDetalheAgendamentoeModalOpen]= useState(false);
  const [selectedAppointment, setSelectedeAppointment] = useState(null);

  const { getAvailability } = DisponibilidadeApi();
  const { getServicesByUser } = ServicesApi();
 

  useEffect(() => {
    const fetchAvaliabilities = async () => {
      try {
        const availabilities = await getAvailability();
        if (availabilities?.data) {
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

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const agendamentos = await getAppointment();
        if (agendamentos) {
          setAgendamentos(agendamentos);
        }
      } catch (error) {
        console.error("Erro ao carregar agendamentos:", error.message);
      }
    };
    fetchAgendamentos();
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

  const disponibilidadesFiltradas = disponibilidades.filter(
    (availability) =>
      dayjs(availability.date).format("YYYY-MM") === mesAtual &&
      availability.service_id == servicoAtual
  );

  const disponibilidadesAgrupadas = disponibilidadesFiltradas.reduce((acc, disponibilidade) => {
    const formattedDate = dayjs(disponibilidade.date).format("YYYY-MM-DD");
    if (!acc[formattedDate]) acc[formattedDate] = [];
    acc[formattedDate].push(disponibilidade);
    return acc;
  }, {});

  const toggleVisibilidade = (data) => {
    setDatasVisiveis((prev) => ({ ...prev, [data]: !prev[data] }));
  };

  const handleCriarDisponibilidadeModalClose = () => {
    setIsCriarDisponibilidadeModalOpen(false);
  };

  const handleDetalheAgendamentoModalClose = () => {
    setIsDetalheAgendamentoeModalOpen(false);
  };

  const handleNewDisponibilidadeCreated = async () => {
    const availabilities = await getAvailability();
    setDisponibilidades(availabilities.data);
  };

  return (
    <C.Container>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Navbar />
        <Typography variant="h6" gutterBottom>
          Agenda
        </Typography>

        <Typography variant="body1">Serviço:</Typography>
        <Select value={servicoAtual} onChange={handleChangeServico} fullWidth>
          {servicos.map((servico) => (
            <MenuItem key={servico.id} value={servico.id}>{servico.name}</MenuItem>
          ))}
        </Select>

        <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
          <IconButton onClick={mesAnterior}><FaChevronLeft /></IconButton>
          <Typography variant="h6">{dayjs(mesAtual).format("MMMM YYYY")}</Typography>
          <IconButton onClick={proximoMes}><FaChevronRight /></IconButton>
        </Box>

        <Stack direction="row" justifyContent="center" my={2}>
          <Button variant="contained" startIcon={<FaPlusCircle />} onClick={() => setIsCriarDisponibilidadeModalOpen(true)}>
            Disponibilidade
          </Button>
        </Stack>

        {Object.entries(disponibilidadesAgrupadas).length > 0 ? (
          Object.entries(disponibilidadesAgrupadas).map(([data, agendamentos]) => (
            <Paper key={data} sx={{ mb: 2, p: 2, textAlign: "center" }}>
              <Box onClick={() => toggleVisibilidade(data)} sx={{ cursor: "pointer" }}>
                <Typography variant="subtitle1">{dayjs(data).format("DD MMMM YYYY")}</Typography>
              </Box>
              {datasVisiveis[data] && (
                <Grid container spacing={1} justifyContent="center" mt={1}>
                  {agendamentos.map((availability, index) => (
                    <Grid item xs={4} key={index}> {/* Cada item ocupará 4 colunas em um grid de 12 (3 por linha) */}
                      <C.Card sx={{ textAlign: "center", padding: "8px" }} onClick={() => {setIsDetalheAgendamentoeModalOpen(true); setSelectedeAppointment(availability)}}>
                        <CardContent>
                        {availability.start_time.slice(0, 5)} - {availability.end_time.slice(0, 5)}
                        </CardContent>
                      </C.Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Paper>
          ))
        ) : (
          <Typography mt={2} color="textSecondary">
            Nenhuma disponibilidade para este serviço neste mês.
          </Typography>
        )}


        <CriarDisponibilidadeModal
          isOpen={isCriarDisponibilidadeModalOpen}
          onClose={handleCriarDisponibilidadeModalClose}
          onCreate={handleNewDisponibilidadeCreated}
        />
        <DetalhesAgendamentoModal
          isOpen={isDetalheAgendamentoeModalOpen}
          onClose={handleDetalheAgendamentoModalClose}
          agendamento={selectedAppointment}
        />
      </Container>
    </C.Container>
  );
};

export default Agenda;
