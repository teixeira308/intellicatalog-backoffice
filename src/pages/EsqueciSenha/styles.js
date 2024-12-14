import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  background-color: #f4f4f4;
`;
export const Content = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 1px 2px #0003;
  background-color: white;
  max-width: 350px;
  padding: 20px;
  border-radius: 5px;
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
  text-align: center;
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

export const StepDescription = styled.p`
  font-size: 1rem;
  color: #666;
`;

export const LabelError = styled.label`
  font-size: 14px;
  color: red;
`;

export const LabelForgot = styled.label`
  font-size: 16px;
  color: #676767;
`;
export const LoadingImage = styled.img`
   width: 50%; /* Largura das imagens */
  height: 50%; /* Altura das imagens */
  background-color: #f10f10f10;  /* Cor de fundo leve */
  justify-content: center;
`;



export const BackButton = styled.button`
  position: fixed; /* Fixa no topo da tela */
  top: 10px; /* Margem do topo */
  left: 10px; /* Margem da esquerda */
  z-index: 100; /* Garante que fique acima de outros elementos */
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #676767;
  font-size: 16px;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%; /* Deixa com formato circular */
  transition: background 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.1); /* Destaque ao passar o mouse */
  }

  svg {
    color: #676767;
  }
`;