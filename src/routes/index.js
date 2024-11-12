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

const Private = ({ Item }) => {
  const { signed } = useAuth();
  
  return signed > 0 ? <Item /> : <Signin />;
};

const RoutesApp = () => {

  
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path="/b/home" element={<Private Item={Home} />} />
          <Route exact path="/b/catalogo" element={<Private Item={Catalogo} />} />
          <Route exact path="/b/demonstracao" element={<Private Item={Demonstracao} />} />
          <Route exact path="/b/suporte" element={<Private Item={Suporte} />} />
          <Route exact path="/b/tutorial" element={<Private Item={Tutorial} />} />
          <Route exact path="/b/minhaloja" element={<Private Item={Loja} />} />
          <Route exact path="/b/inteligencia" element={<Private Item={Inteligencia} />} />
          <Route path="/b/" element={<Signin />} />
          <Route exact path="/b/signup" element={<Signup />} />
          <Route path="*" element={<Signin />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
