import React from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";

const Suporte = () => {
  return (
    <C.Container>
      <Navbar />
      <C.Title>Suporte</C.Title>
      <C.Section>
        <C.Subtitle>Em caso de algum problema ou erro inesperado, segue nosso contato:</C.Subtitle>
        <C.Step>
          <C.StepTitle>E-mail:</C.StepTitle>
          <C.StepDescription href="mailto:contato@vitrinesmart.com">contato@vitrinesmart.com
          </C.StepDescription>
        </C.Step>
        <C.Step>
          <C.StepTitle>Whatsapp:</C.StepTitle>
          <C.StepDescription href="https://wa.me/5511973472745?text=Olá,%20gostaria%20de%20mais%20informações" target="_blank">(11) 97347-2745

          </C.StepDescription>
        </C.Step>
      </C.Section>
    </C.Container>
  )
};

export default Suporte;