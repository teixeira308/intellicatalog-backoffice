import React, { useState,useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";

import AppointmentApi from "../../services/agendamentoApi"


const DetalhesAgendamentoModal = ({ isOpen, onClose, disponibilidade }) => {

  const { getAppoointmentByAvaliability } = AppointmentApi();
  const [agendamento, setAgendamento] = useState([])

   useEffect(() => {
       const fetchAppointment = async () => {
        console.log(disponibilidade)
         try {
           const appointment = await getAppoointmentByAvaliability(disponibilidade.id);
           if (appointment) {
             setAgendamento(appointment);
           }
         } catch (error) {
           console.error("Erro ao carregar serviços:", error.message);
         }
       };
       fetchAppointment();
     }, []);

  if (!isOpen) return null;

  // Formatação de horários
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
              <strong>Data:</strong> {new Date(agendamento.date).toLocaleString("pt-BR", { dateStyle: "short" })}
            </Typography>
            <Typography variant="body1">
              <strong>Horário:</strong> {startTime} - {endTime}
            </Typography>
            <Typography variant="body1">
              <strong>Cliente:</strong> {agendamento.client_name}
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong> {agendamento.status}
            </Typography>
            <Typography variant="body1">
              <strong>Observações:</strong> {agendamento.notes || "Sem observações"}
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
