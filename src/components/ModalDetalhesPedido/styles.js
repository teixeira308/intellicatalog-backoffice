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

// Estilos para o container do modal
export const ModalContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  max-height: 70vh; /* Define uma altura máxima */
  overflow-y: auto; /* Ativa a barra de rolagem vertical */
  padding: 1rem; /* Adiciona espaçamento interno */
  gap: 1rem; /* Espaçamento entre os elementos internos */
  scrollbar-width: thin; /* Estiliza a barra no Firefox */
  scrollbar-color: #c1c1c1 transparent;

  /* Estiliza a barra de rolagem para navegadores baseados em Webkit (Chrome, Edge, etc.) */
  &::-webkit-scrollbar {
    width: 8px; /* Largura da barra */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c1c1c1; /* Cor do polegar */
    border-radius: 4px; /* Deixa os cantos arredondados */
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #a1a1a1; /* Cor ao passar o mouse */
  }
  &::-webkit-scrollbar-track {
    background-color: transparent; /* Cor do fundo da barra */
  }
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

export const Textarea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  width: 100%; // Ajusta a largura para 100% do contêiner pai
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

export const Card = styled.div`
  width: 100%;
  max-width: 800px;
  font-size: 16px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, background-color 0.2s ease;
`;