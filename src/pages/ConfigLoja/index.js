import React from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";
 
const ConfigLoja = () => {
 
 
  return (
    <C.Container>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Navbar />
        <Typography variant="h6" gutterBottom>
          Configurações
        </Typography>

    
      </Container>
    </C.Container>
  );
};

export default ConfigLoja;
