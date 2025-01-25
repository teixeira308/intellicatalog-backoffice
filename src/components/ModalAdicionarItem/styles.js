import styled from "styled-components";

// Estilos para o overlay do modal
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Textarea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  width: 100%; // Ajusta a largura para 100% do contêiner pai
`;




// Estilos para o container do modal
export const ModalContainer = styled.div`
  background: #fff;
  width: 800px; /* Aumenta a largura */
  max-height: 90vh; /* Limita a altura */
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
// Estilos para o cabeçalho do modal
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

// Estilos para o botão de fechar
export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
`;

// Estilos para o formulário do modal
export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
`;

// Estilos para cada linha do formulário
export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  & > div {
    flex: 1;
    &:first-child {
      margin-right: 10px;
    }
  }
`;

// Estilos para as colunas do formulário
export const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

// Estilos para os rótulos dos inputs
export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

// Estilos para os inputs
export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

// Estilos para o botão de submit
export const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ProductRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

export const ProductName = styled.span`
  flex: 1;
  font-size: 16px;
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
`;

export const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const QuantityValue = styled.span`
  width: 40px;
  text-align: center;
  font-size: 16px;
`;

export const ProductPrice = styled.span`
  font-size: 16px;
  font-weight: bold;
  text-align: right;
`;

export const ModalBody = styled.div`
  padding: 20px;
  max-height: 600px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

 

 
 

 
export const ModalFooter = styled.div`
  padding: 15px;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
`;