import React from "react";
import * as C from "./styles";
import { NumericFormat } from "react-number-format";
import "./styles.css";

const DetalhespedidoModal = ({ isOpen, onClose, pedido }) => {

  if (!isOpen) return null;
  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Detalhes do Pedido</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalForm>
          {/* Informações do Pedido */}
          <C.FormRow>
            <C.FormColumn>
              <C.Label>Pedido #{pedido.id}</C.Label>
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label>Data do Pedido</C.Label>
              <C.Input
                type="text"
                value={new Date(pedido.order_date).toLocaleString("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
                readOnly
              />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label>Status</C.Label>
              <C.Input type="text" value={pedido.status} readOnly />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label>Telefone</C.Label>
              <C.Input type="text" value={pedido.phone} readOnly />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label>Endereço de Entrega</C.Label>
              <C.Input type="text" value={pedido.delivery_address} readOnly />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label>Total do Pedido</C.Label>
              <NumericFormat
                className="NumericFormat"
                value={pedido.total_amount}
                displayType="text"
                thousandSeparator
                prefix="R$ "
                readOnly
              />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label>Notas</C.Label>
              <C.Textarea value={pedido.notes || "Nenhuma nota"} readOnly />
            </C.FormColumn>
          </C.FormRow>

          {/* Itens do Pedido */}
          <C.FormRow>
            <C.FormColumn>
              <C.Label>Itens do Pedido</C.Label>
              <C.ItemsList>
                {pedido.items.map((item, index) => (
                  <C.Item key={index}>
                    <p>
                      <strong>Produto ID:</strong> {item.product_id}
                    </p>
                    <p>
                      <strong>Quantidade:</strong> {item.quantity}
                    </p>
                    <p>
                      <strong>Preço Unitário:</strong>{" "}
                      <NumericFormat
                        value={item.unit_price}
                        displayType="text"
                        thousandSeparator
                        prefix="R$ "
                      />
                    </p>
                    <p>
                      <strong>Total:</strong>{" "}
                      <NumericFormat
                        value={item.total_price}
                        displayType="text"
                        thousandSeparator
                        prefix="R$ "
                      />
                    </p>
                  </C.Item>
                ))}
              </C.ItemsList>
            </C.FormColumn>
          </C.FormRow>

          <C.Button onClick={onClose}>Fechar</C.Button>
        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default DetalhespedidoModal;
