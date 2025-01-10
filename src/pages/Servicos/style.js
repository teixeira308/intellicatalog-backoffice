import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  padding-top: 220px; /* Adiciona espaço abaixo do Navbar */
  background-color: #f4f4f4;
`;
export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  padding-top: 80px; /* Espaço para o Navbar */
  background-color: #f4f4f4;
`;
 

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  width: 100%;
`;

export const Subtitle = styled.p`
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



 

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
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

export const CardStatus = styled.span`
  background-color: ${(props) => (props.isActive ? "#4caf50" : "#f44336")};
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
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



export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 40px; /* Espaçamento entre o botão de edição e o toggle */
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

export const EditButton = styled(BaseButton)``;
export const EditImageButton = styled(BaseButton)``;
export const TrashButton = styled(BaseButton)`
  color: red;

  &:hover {
    color: darkred;
  }
`;
