import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";
import AgendamentoApi from "../../services/agendamentoApi";

const DetalhesAgendamentoModal = ({ isOpen, onClose, disponibilidade }) => {
  const [agendamento, setAgendamento] = useState(null);
  const { getAppointmentByAvaliability } = AgendamentoApi();

  useEffect(() => {
    const fetchAgendamento = async () => {
      if (disponibilidade && disponibilidade.id) {
        try {
          const response = await getAppointmentByAvaliability(disponibilidade.id);
          console.log(response); // Verifique o formato da resposta

          // Verifica se a resposta contém dados
          if (Array.isArray(response) && response.length > 0) {
            setAgendamento(response[0]); // Supondo que a resposta seja um array de agendamentos
          } else {
            setAgendamento(null); // Caso não haja agendamento, setar null
          }
        } catch (error) {
          console.error("Erro ao carregar agendamento:", error.message);
        }
      }
    };

    fetchAgendamento();
  }, [disponibilidade]);

  if (!isOpen) return null;

  const startTime = agendamento ? agendamento.start_time.slice(0, 5) : "";
  const endTime = agendamento ? agendamento.end_time.slice(0, 5) : "";

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Detalhes do Agendamento</DialogTitle>
      <DialogContent>
        {agendamento ? (
          <>
            <Typography variant="body1">
              <strong>Serviço:</strong> {agendamento.service_name}
            </Typography>
            <Typography variant="body1">
              <strong>Data:</strong> {new Date(disponibilidade.date).toLocaleString("pt-BR", { dateStyle: "short" })}
            </Typography>
            <Typography variant="body1">
              <strong>Horário:</strong> {startTime} - {endTime}
            </Typography>
            <Typography variant="body1">
              <strong>Cliente:</strong> {agendamento.client_name || "Não informado"}
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong> {agendamento.status}
            </Typography>
            <Typography variant="body1">
              <strong>Observações:</strong> {agendamento.obs || "Sem observações"}
            </Typography>
          </>
        ) : (
          <Typography variant="body1" color="error">Nenhum agendamento encontrado.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetalhesAgendamentoModal;
