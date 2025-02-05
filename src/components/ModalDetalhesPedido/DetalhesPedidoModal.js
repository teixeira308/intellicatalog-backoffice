import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";

const DetalhespedidoModal = ({ isOpen, onClose, pedido }) => {

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Pedido #{pedido.id}</DialogTitle>
      <DialogContent>
        {/* Informações do Pedido */}
        <Typography variant="body1">
          <strong>Data do Pedido:</strong> {new Date(pedido.order_date).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
        </Typography>
        <Typography variant="body1">
          <strong>Telefone:</strong> {pedido.phone}
        </Typography>
        <Typography variant="body1">
          <strong>Endereço de Entrega:</strong> {pedido.delivery_address}
        </Typography>
        <Typography variant="body1">
          <strong>Total do Pedido:</strong> R${pedido.total_amount}
        </Typography>
        <Typography variant="body1">
          <strong>Notas:</strong> {pedido.notes || "Nenhuma nota"}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetalhespedidoModal;
