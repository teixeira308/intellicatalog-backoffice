import React from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  return (
    <C.Container>
      <Navbar />
      <C.Title>Bem vindo ao <br/>Vitrine Smart</C.Title>
      <C.Section>
        <C.Subtitle>Vamos começar?</C.Subtitle>
        <C.Step>
          <C.StepTitle>1. Crie suas categorias</C.StepTitle>
          <C.StepDescription>
          Entre no menu catálogo e crie sua primeira categoria.
          </C.StepDescription>
        </C.Step>
        <C.Step>
          <C.StepTitle>2. Registre seu produtos</C.StepTitle>
          <C.StepDescription>
          Após criar sua primeira categoria, registre seu produto e adicione imagens.
          </C.StepDescription>
        </C.Step>
        <C.Step>
          <C.StepTitle>3. Administre seu catalogo online</C.StepTitle>
          <C.StepDescription>
          Controle quais produtos estão disponíveis e a ordem das categorias no seu catálogo.
          </C.StepDescription>
        </C.Step>
        <C.Step>
          <C.StepTitle>4. Administre sua loja</C.StepTitle>
          <C.StepDescription>
          Personalize seu catálogo e receba os pedidos no whatsapp.
          </C.StepDescription>
        </C.Step>
      </C.Section>
    </C.Container>
  );
};

export default Home;
