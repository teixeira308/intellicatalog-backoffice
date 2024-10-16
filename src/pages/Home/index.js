import React from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  return (
    <C.Container>
      <Navbar />
      <C.Title>Bem vindo ao Intellicatalog</C.Title>
      <C.Section>
        <C.Subtitle>Vamos começar?</C.Subtitle>
        <C.Step>
          <C.StepTitle>1. Crie suas categorias</C.StepTitle>
          <C.StepDescription>
          Instrução 1
          </C.StepDescription>
        </C.Step>
        <C.Step>
          <C.StepTitle>2. Registre seu produtos</C.StepTitle>
          <C.StepDescription>
          Instrução 2
          </C.StepDescription>
        </C.Step>
        <C.Step>
          <C.StepTitle>3. Administre seu catalogo online</C.StepTitle>
          <C.StepDescription>
          Instrução 3
          </C.StepDescription>
        </C.Step>
      </C.Section>
    </C.Container>
  );
};

export default Home;
