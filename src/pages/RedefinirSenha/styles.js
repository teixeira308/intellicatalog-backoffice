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

export const Title = styled.h3`
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

export const labelError = styled.label`
  font-size: 14px;
  color: red;
`;

export const LoadingImage = styled.img`
   width: 50%; /* Largura das imagens */
  height: 50%; /* Altura das imagens */
  background-color: #f10f10f10;  /* Cor de fundo leve */
  justify-content: center;
`;
