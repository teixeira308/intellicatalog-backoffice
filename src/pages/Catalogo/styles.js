import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: top;
  flex-direction: column;
  height: 100vh;
  gap: 20px;
  margin-top:80px;
`;



export const Title = styled.h2``;



export const Card = styled.div`
  width: 97%;
  font-size: 20px;
  padding: 20px 20px;
  max-width: 800px;
  font-size:17px;
  display: flex;
  flex-direction: column;  /* Organiza os itens verticalmente */
  padding: 20px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const StatusIndicator = styled.span`
  height: 15px;
  width: 15px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
  background-color: ${(props) => (props.isOpen ? 'green' : 'red')};
`;


export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 40px; /* Diminuído */
  height: 20px; /* Diminuído */

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 20px; /* Ajustado proporcionalmente ao novo tamanho */

  &::before {
    position: absolute;
    content: '';
    height: 16px; /* Diminuído proporcionalmente */
    width: 16px; /* Diminuído proporcionalmente */
    left: 2px; /* Ajuste para centralizar corretamente dentro do toggle */
    bottom: 2px; /* Ajuste para centralizar corretamente dentro do toggle */
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + & {
    background-color: #2196f3;
  }

  input:checked + &::before {
    transform: translateX(20px); /* Ajustado para o novo tamanho */
  }
`;


export const StatusText = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: ${(props) => (props.isOpen ? 'green' : 'red')};
`;

export const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 40px; /* Espaçamento entre o botão de edição e o toggle */
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #2196f3;
  font-size: 15px;

  &:hover {
    color: #1769aa;
  }
`;



export const EditImageButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #2196f3;
  font-size: 15px;

  &:hover {
    color: #1769aa;
  }
`;

export const EditProductButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #2196f3;
  font-size: 15px;

  &:hover {
    color: #1769aa;
  }
`;

export const ShowProductsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #2196f3;
  font-size: 14px;
  text-decoration: underline;

  &:hover {
    color: #1769aa;
  }
`;

export const ProdutoList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
  width: 100%;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
  
`;

export const ProdutoActions = styled.div`
  display: flex;
  flex-direction: column; // Alinha os itens na coluna
  margin-bottom: 10px; // Espaço abaixo do contêiner, se desejado
`;



export const ToggleLink = styled.span`
  cursor: pointer;
  color: #2196f3;
  font-size: 14px;
  margin-left: 15px;
  text-decoration: underline;

  &:hover {
    color: #1769aa;
  }
`;

export const CategoriaLink = styled.span`
  cursor: pointer;
  color: #2196f3;
  text-decoration: underline;
  font-size: 16px;
  width: 20px;
  &:hover {
    color: #1769aa;
  }
`;




export const CreateButton = styled.button`
  background: none;
  border: 1px solid #2196f3; /* Adiciona uma borda */
  border-radius: 20px; /* Torna as bordas arredondadas */
  cursor: pointer;
  color: #2196f3;
  font-size: 13px;
  padding: 5px 10px; /* Adiciona espaço interno para melhor aparência */
  transition: 0.3s; /* Suaviza a transição do hover */
  width: 180px;
  &:hover {
    color: #1769aa;
    border-color: #1769aa; /* Altera a cor da borda no hover */
  }
`;

export const ReorderButton = styled.button`
  background: none;
  border: 1px solid #2196f3; /* Adiciona uma borda */
  border-radius: 20px; /* Torna as bordas arredondadas */
  cursor: pointer;
  color: #2196f3;
  font-size: 13px;
  padding: 5px 10px; /* Adiciona espaço interno para melhor aparência */
  transition: 0.3s; /* Suaviza a transição do hover */
width: 180px;
  &:hover {
    color: #1769aa;
    border-color: #1769aa; /* Altera a cor da borda no hover */
  }
`;


export const ReorderButtonProducts = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #2196f3;
  font-size: 13px;

  &:hover {
    color: #1769aa;
  }
`;



export const TrashButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: red;
  font-size: 15px;

  &:hover {
    color: #1769aa;
  }
`;

export const CategoriaList = styled.div`
  margin-bottom: 20px;
`;
export const CategoriaCardDragging = styled(Card)`
  background-color: #e0f7fa; /* Cor de destaque enquanto arrasta */
  border-color: #007bff;
`;

export const CategoriaDraggingOver = styled.div`
  border: 2px dashed #007bff; /* Estilo de feedback ao arrastar */
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;


export const ProdutoItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
  color: #333;
 
  &:last-child {
    border-bottom: none;
  }
`;

export const ProdutoOperations = styled.div`
  display: flex; // Usa flexbox para alinhar os botões
  gap: 45px; // Aumenta o espaçamento entre os botões (pode ajustar o valor conforme necessário)
  margin-top: 9px; // Espaço acima dos botões
`;


export const ProdutoItemOrderChange = styled.div`
  display: flex;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    font-size: 16px;
    color: #333;
    justify-content: space-between;
  
    &:last-child {
      border-bottom: none;
    }
  `;

  export const WhatsappButton = styled.a`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #25D366;
  color: white;
  border-radius: 50%;
  padding: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  
  &:hover {
    background-color: #128C7E;
  }
`;