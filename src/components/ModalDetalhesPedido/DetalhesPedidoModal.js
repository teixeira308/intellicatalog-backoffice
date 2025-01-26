import React, { useState, useEffect } from "react";
import * as C from "./styles";
import { NumericFormat } from "react-number-format";
import "./styles.css"; 

const DetalhespedidoModal = ({ isOpen, onClose, pedido }) => {
 
  if (!isOpen) return null;
 
  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Pedido #{pedido.id}</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalForm>
          {/* Informações do Pedido */}
          <C.FormRow>
            <C.FormColumn>
              <C.Label>Data do Pedido</C.Label>{" "}
              {new Date(pedido.order_date).toLocaleString("pt-BR", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </C.FormColumn>
            <C.FormColumn>
              <C.Label>Telefone</C.Label>
              {pedido.phone}
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label>Endereço de Entrega</C.Label>
              {pedido.delivery_address}
            </C.FormColumn>
            <C.FormColumn>
              <C.Label>Total do Pedido</C.Label>
              R${pedido.total_amount}
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label>Notas</C.Label>
              {pedido.notes || "Nenhuma nota"}
            </C.FormColumn>
          </C.FormRow>

          <C.Button onClick={onClose}>Fechar</C.Button>
        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default DetalhespedidoModal;
