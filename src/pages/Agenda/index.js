import React, { useState, useEffect } from "react";
import * as C from "./styles";
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
} from "@mui/material";
import { FaChevronLeft, FaChevronRight, FaPlusCircle } from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";
import DisponibilidadeApi from "../../services/disponibilidadeApi";
import ServicesApi from "../../services/ServicesApi";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import CriarDisponibilidadeModal from "../../components/ModalCriarDisponibilidade/CriarDisponibilidadeModal";

const Agenda = () => {
  dayjs.locale("pt-br");
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [servicoAtual, setServicoAtual] = useState(null);
  const [mesAtual, setMesAtual] = useState(dayjs().format("YYYY-MM"));
  const [datasVisiveis, setDatasVisiveis] = useState({});
  const [isCriarDisponibilidadeModalOpen, setIsCriarDisponibilidadeModalOpen] =
    useState(false);

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

  const disponibilidadesAgrupadas = disponibilidadesFiltradas.reduce(
    (acc, disponibilidade) => {
      const formattedDate = dayjs(disponibilidade.date).format("YYYY-MM-DD");

      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }

      acc[formattedDate].push(disponibilidade);
      return acc;
    },
    {}
  );

  const toggleVisibilidade = (data) => {
    setDatasVisiveis((prev) => ({
      ...prev,
      [data]: !prev[data],
    }));
  };

  const handleCriarDisponibilidadeModalClose = () => {
    setIsCriarDisponibilidadeModalOpen(false);
  };

  const handleNewDisponibilidadeCreated = async () => {
    const availabilities = await getAvailability();
    setDisponibilidades(availabilities.data);
  };

  return (
    <C.Container>
      <Navbar />
      <Container>
        <Typography variant="h6" gutterBottom>
          Agenda
        </Typography>

        {/* Controles do Mês */}
        <Box display="flex" justifyContent="center" alignItems="center" width="100%">
          <Stack direction="row" alignItems="center" spacing={2} mb={3}>
            <IconButton onClick={mesAnterior}>
              <FaChevronLeft />
            </IconButton>
            <Box minWidth={120} textAlign="center">
              <Typography variant="h6">
                {dayjs(mesAtual).format("MMMM YYYY")}
              </Typography>
            </Box>
            <IconButton onClick={proximoMes}>
              <FaChevronRight />
            </IconButton>
          </Stack>
        </Box>



        {/* Seleção de Serviço */}
        <Typography variant="body1">Serviço:</Typography>
        <Select value={servicoAtual} onChange={handleChangeServico} fullWidth>
          {servicos.map((servico) => (
            <MenuItem key={servico.id} value={servico.id}>
              {servico.name}
            </MenuItem>
          ))}
        </Select>

        {/* Botão Criar Disponibilidade */}
        <Stack direction="row" justifyContent="end" my={2}>
          <Button
            variant="contained"
            startIcon={<FaPlusCircle />}
            onClick={() => setIsCriarDisponibilidadeModalOpen(true)}
          >
            Disponibilidade
          </Button>
        </Stack>

        {/* Lista de Disponibilidades */}
        {Object.entries(disponibilidadesAgrupadas).length > 0 ? (
          Object.entries(disponibilidadesAgrupadas).map(([data, agendamentos]) => (
            <Paper key={data} sx={{ mb: 2, p: 2 }}>
              <Box onClick={() => toggleVisibilidade(data)} sx={{ cursor: "pointer" }}>
                <Typography variant="h6">{dayjs(data).format("DD MMMM YYYY")}</Typography>
              </Box>
              {datasVisiveis[data] && (
                <Stack spacing={1} mt={1}>
                  {agendamentos.map((availability, index) => (
                    <Card key={index} sx={{ bgcolor: availability.status === "booked" ? "error.light" : "success.light" }}>
                      <CardContent>
                        <Typography>
                          {availability.start_time} - {availability.end_time}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              )}
            </Paper>
          ))
        ) : (
          <Typography mt={2} color="textSecondary">
            Nenhuma disponibilidade para este serviço neste mês.
          </Typography>
        )}

        {/* Modal de Criação */}
        <CriarDisponibilidadeModal
          isOpen={isCriarDisponibilidadeModalOpen}
          onClose={handleCriarDisponibilidadeModalClose}
          onCreate={handleNewDisponibilidadeCreated}
        />
      </Container>
    </ C.Container>
  );
};

export default Agenda;
