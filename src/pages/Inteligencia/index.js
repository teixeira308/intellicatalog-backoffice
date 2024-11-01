import React, { useState } from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";

const Inteligencia = () => {
  const [activeStep, setActiveStep] = useState(null);
  const [businessArea, setBusinessArea] = useState(""); // Estado para a área do negócio

  const toggleStep = (step) => {
    setActiveStep(activeStep === step ? null : step);
  };

  const handleInputChange = (event) => {
    setBusinessArea(event.target.value);
  };

  return (
    <C.Container>
      <Navbar />
      <C.Title>Venda com IA</C.Title>
      <C.Section>
        <C.Subtitle>Vamos buscar novas ideias para vender nas redes sociais?</C.Subtitle>

        <input 
                type="text" 
                placeholder="Quais produtos você vende?" 
                value={businessArea} 
                onChange={handleInputChange} 
                style={{ marginTop: '10px', padding: '5px', width: '300px' , textAlign: "center"}} 
              />

        <C.Step >
          <C.StepTitle onClick={() => toggleStep(1)}>1. Copie essa pergunta</C.StepTitle>
          {activeStep === 1 && (
            <C.StepDescription>
              Tenho uma loja online de <strong>{businessArea || "__________"}</strong> e preciso de ideias para postar nas redes sociais para vender.
              <br />
             
            </C.StepDescription>
          )}
        </C.Step>

        <C.Step onClick={() => toggleStep(2)}>
          <C.StepTitle>2. Entre no ChatGPT</C.StepTitle>
          {activeStep === 2 && (
            <C.StepDescription>
              Cole a pergunta quando <a href="https://chat.openai.com/" target="_blank" rel="noopener noreferrer">clicar aqui e entrar no ChatGPT.</a>
            </C.StepDescription>
          )}
        </C.Step>

        <C.Step onClick={() => toggleStep(3)}>
          <C.StepTitle>3. Avalie as ideias</C.StepTitle>
          {activeStep === 3 && (
            <C.StepDescription>
              Avalie as ideias fornecidas e aplique.
            </C.StepDescription>
          )}
        </C.Step>

      </C.Section>
    </C.Container>
  );
};

export default Inteligencia;
