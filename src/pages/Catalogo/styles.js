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
  max-width: 800px;
  font-size: 17px;
  padding: 20px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, background-color 0.2s ease;
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
  width: 30px; /* Reduzido */
  height: 16px; /* Reduzido */

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
  border-radius: 16px;

  &::before {
    position: absolute;
    content: '';
    height: 12px; /* Reduzido proporcionalmente */
    width: 12px; /* Reduzido proporcionalmente */
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + & {
    background-color: #2196f3;
  }

  input:checked + &::before {
    transform: translateX(14px); /* Ajustado para o novo tamanho */
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
  margin: 20px auto; /* Centraliza horizontalmente */
  width: 100%;
  max-width: 800px; /* Limita a largura máxima */
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
`;


export const ProdutoActions = styled.div`
  display: flex;
  flex-direction: column; // Alinha os itens na coluna
  margin-bottom: 10px; // Espaço abaixo do contêiner, se desejado
   gap: 10px; /* Espaçamento entre os itens */
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


export const CategoriaList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100px;
`;
export const CategoriaCardDragging = styled(Card)`
  background-color: #e0f7fa; /* Cor de destaque enquanto arrasta */
`;

export const CategoriaDraggingOver = styled(Card)`
  border: 2px dashed #007bff; /* Estilo de feedback ao arrastar */
  background-color: #f0f8ff; /* Fundo diferenciado */
`;


export const ProdutoItem = styled.li`
  display: flex;
  align-items: center; /* Alinha verticalmente no centro */
  justify-content: space-between; /* Espaça o título e os botões/toggle */
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 14px; /* Diminui o tamanho da fonte */
  color: #333;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 600px) {
    flex-direction: column; /* Empilha os itens em telas muito pequenas */
    align-items: flex-start; /* Alinha os itens à esquerda */
    gap: 10px; /* Espaço entre os itens */
  }
`;




export const ProdutoOperations = styled.div`
  display: flex;
  align-items: center; /* Centraliza os itens verticalmente */
  gap: 10px; /* Espaçamento reduzido entre os itens */
  flex-wrap: nowrap; /* Impede quebra de linha */
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

export const BaseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #2196f3;
  font-size: 15px;
  display: flex;
  align-items: center; /* Centraliza ícone e texto */
  gap: 5px; /* Espaçamento entre ícone e texto */
  padding: 5px 10px;
  border-radius: 8px; /* Borda arredondada para todos */
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: rgba(33, 150, 243, 0.1);
    color: #1769aa;
  }
`;

export const EditProductButton = styled(BaseButton)``;
export const EditImageButton = styled(BaseButton)``;
export const TrashButton = styled(BaseButton)`
  color: red;

  &:hover {
    color: darkred;
  }
`;
