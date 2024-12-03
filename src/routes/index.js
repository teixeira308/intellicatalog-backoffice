import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Demonstracao from "../pages/Demonstracao";
import Suporte from "../pages/Suporte";
import Tutorial from "../pages/Tutorial";
import Catalogo from "../pages/Catalogo";
import Loja from "../pages/Loja";
import Inteligencia from "../pages/Inteligencia";
import RedefinirSenha from "../pages/RedefinirSenha";

const Private = ({ Item }) => {
  const { signed } = useAuth();
  
  return signed > 0 ? <Item /> : <Signin />;
};

const RoutesApp = () => {

  
  return (
    <BrowserRouter basename='/b'>
      <Fragment>
        <Routes>
          <Route exact path="/home" element={<Private Item={Home} />} />
          <Route exact path="/catalogo" element={<Private Item={Catalogo} />} />
          <Route exact path="/demonstracao" element={<Private Item={Demonstracao} />} />
          <Route exact path="/suporte" element={<Private Item={Suporte} />} />
          <Route exact path="/tutorial" element={<Private Item={Tutorial} />} />
          <Route exact path="/minhaloja" element={<Private Item={Loja} />} />
          <Route exact path="/inteligencia" element={<Private Item={Inteligencia} />} />
          <Route exact path="/redefinirsenha/:token" element={<Private Item={RedefinirSenha} />} />
          <Route path="/" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="*" element={<Signin />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
