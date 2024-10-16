import React from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";

const Suporte = ()  => {
    return (
        <C.Container>
        <Navbar />
        <C.Title>Suporte</C.Title>
        <C.InfoSection>
          <C.Subtitle>Em caso de algum problema ou erro inesperado, segue nosso contato:</C.Subtitle>
          <C.ContactInfo>
            <C.ContactItem>
              <C.ContactLabel>E-mail: </C.ContactLabel>
              <C.ContactDetail href="mailto:support@example.com">teixeira308@hotmail.com</C.ContactDetail>
            </C.ContactItem>
            <C.ContactItem>
              <C.ContactLabel>Whatsapp: </C.ContactLabel>
              <C.ContactDetail href="tel:+5511973472745">(11) 97347-2745</C.ContactDetail>
            </C.ContactItem>
          </C.ContactInfo>
        </C.InfoSection>
      </C.Container>
    )
};

export default Suporte;