import styled from "styled-components";

export const Container = styled.div`

  margin-top:70px;
`;



export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px; /* Espaço entre o ícone e o texto */
  background-color: #f4f4f4; /* Cor de fundo padrão */
  border: 1px solid #ddd; /* Borda leve */
  border-radius: 50px; /* Forma arredondada */
  padding: 8px 12px; /* Espaço interno do botão */
  font-size: 14px; /* Tamanho da fonte */
  color: #333; /* Cor do texto */
  cursor: pointer; /* Muda o cursor ao passar o mouse */
  transition: all 0.3s ease; /* Transições suaves */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra leve */

  &:hover {
    background-color: #e0e0e0; /* Cor ao passar o mouse */
    border-color: #bbb; /* Cor da borda ao passar o mouse */
    color: #000; /* Texto mais escuro no hover */
  }

  &:active {
    transform: scale(0.98); /* Leve redução ao clicar */
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2); /* Ajuste da sombra ao clicar */
  }

  svg {
    font-size: 16px; /* Tamanho do ícone */
  }
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  width: 100%;
`;

export const Subtitle = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #555;
`;

export const Step = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StepTitle = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 10px;
  color: #333;
`;

export const StepDescription = styled.a`
  font-size: 1rem;
  color: #666;
`;

export const Card = styled.div`
  width: 97%;
  align-items: center;

  font-size: 17px;
  padding: 20px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, background-color 0.2s ease;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardTitle = styled.h2`
  font-size: 18px;
  color: #333;
`;

 

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CardDetail = styled.p`
  font-size: 14px;
  color: #555;
  strong {
    font-weight: bold;
    color: #333;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px; /* Espaço entre os botões */
  justify-content: center; /* Centraliza os botões no eixo horizontal */
  align-items: center; /* Alinha os botões verticalmente */
  margin-top: 10px; /* Espaço superior */
`;

export const TrashButton = styled(ActionButton)`
  background-color: #f44336; /* Vermelho para excluir */
  color: #fff; /* Texto branco */
  border: none;

  &:hover {
    background-color: #d32f2f; /* Vermelho mais escuro no hover */
  }
`;

export const EditButton = styled(ActionButton)`
  background-color: #4caf50; /* Verde para editar */
  color: #fff; /* Texto branco */
  border: none;

  &:hover {
    background-color: #45a049; /* Verde mais escuro no hover */
  }
`;

export const CreateButton = styled(ActionButton)`
  background-color: #4caf50; /* Verde para editar */
  color: #fff; /* Texto branco */
  border: none;

  &:hover {
    background-color: #45a049; /* Verde mais escuro no hover */
  }
`;

export const ReordButton = styled(ActionButton)`
  background-color: #1769aa; /* Verde para editar */
  color: #fff; /* Texto branco */
  border: none;

  &:hover {
    background-color: #45a049; /* Verde mais escuro no hover */
  }
`;

export const ItemList = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

export const Item = styled.div`
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
`;
export const CardStatus = styled.span`
  background-color: ${(props) => {
    switch (props.status) {
      case "pendente":
        return "#f4b400"; // Amarelo
      case "confirmada":
        return "#4caf50"; // Verde
      case "enviada":
        return "#2196f3"; // Azul
      case "finalizada":
        return "#9c27b0"; // Roxo
      case "cancelado":
        return "#f44336"; // Vermelho
      case "produzindo":
        return "#2196f3"; // Azul
      default:
        return "#757575"; // Cinza
    }
  }};
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  text-transform: capitalize; /* Deixa o texto com a primeira letra maiúscula */
`;
