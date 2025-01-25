import React, { useState, useEffect } from "react";
import * as C from "./styles"; 
import { NumericFormat } from 'react-number-format';
import "./styles.css"

const DetalhesPedidoModal = ({ isOpen, onClose, pedido }) => {
 
  const [formData, setFormData] = useState({
    delivery_address: "",
    payment_method: "",
    description: "",
    id: "",
    unit: "",
    unitquantity: "",
    promocional_price:""
  });

  const filterFormData = (data) => {
    // Campos permitidos
    const allowedFields = [
      'delivery_address',
      'payment_method',
      'id',
      'price',
      'unit',
      'unitquantity',
      'promocional_price'
    ];
  
    // Filtra os dados mantendo apenas os campos permitidos
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );
  
    // Verifica se promocional_price é uma string vazia e a redefine para null
    if (filteredData.promocional_price === '') {
      filteredData.promocional_price = null;
    }
  
    return filteredData;
  };
  


  useEffect(() => {
    if (pedido) {
      console.log(pedido)
      setFormData(pedido);
    }
  }, [pedido]);

  if (!isOpen) return null;

 
  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Detalhes</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalForm>
          <C.FormRow>
            <C.FormColumn>
              <C.Label>Pedido # {formData.id}</C.Label>

            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="name">Título</C.Label>
              <C.Input
                type="text"
                name="titulo"
                id="titulo"
                value={formData.titulo}
                required
              />
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="description">Marca</C.Label>
              <C.Input
                type="text"
                name="brand"
                id="brand"
                value={formData.brand}
               
              />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="description">Descrição</C.Label>
              <C.Textarea
                name="description"
                id="description"
                value={formData.description}
               
                maxLength={500} // Limita a 100 caracteres
                rows={10} // Define o número de linhas visíveis
                placeholder="Digite sua descrição aqui..."
              />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="price">Preço</C.Label>
              <NumericFormat
                className="NumericFormat"
                name="price"
                id="price"
                value={formData.price}
                onValueChange={(values) => {
                  const { formattedValue, value } = values;
                  setFormData((prev) => ({ ...prev, price: value })); // Atualiza o estado com o valor numérico
                }}
                thousandSeparator={true}
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={'R$ '}
                placeholder="0,00" // Placeholder para o formato esperado
              />
            </C.FormColumn>
            <C.FormColumn>
              <C.Label htmlFor="promocional_price">Preço promocional</C.Label>
              <NumericFormat
                className="NumericFormat"
                name="promocional_price"
                id="promocional_price"
                value={formData.promocional_price}
                onValueChange={(values) => {
                  const { formattedValue, value } = values;
                  setFormData((prev) => ({ ...prev, promocional_price: value })); // Atualiza o estado com o valor numérico
                }}
                thousandSeparator={true}
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={'R$ '}
                placeholder="0,00" // Placeholder para o formato esperado
              />
            </C.FormColumn>
          </C.FormRow>
          {/*} <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="unit">Unidade</C.Label>
              <C.Input
                type="text"
                name="unit"
                id="unit"
                value={formData.unit}
                onChange={handleChange}
              />
            </C.FormColumn>
            <C.FormColumn>
              <C.Label htmlFor="unitquantity">Quantidade(un)</C.Label>
              <C.Input
                type="text"
                name="unitquantity"
                id="unitquantity"
                value={formData.unitquantity}
                onChange={handleChange}
              />
            </C.FormColumn>
            </C.FormRow>{*/}
          <C.Button onClick={onClose}>Fechar</C.Button>
        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default DetalhesPedidoModal;
