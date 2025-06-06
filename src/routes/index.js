import { Fragment } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Demonstracao from "../pages/Demonstracao";
import Suporte from "../pages/Suporte";
import Tutorial from "../pages/Tutorial";
import Catalogo from "../pages/Catalogo";
import Loja from "../pages/Loja";
import Agenda from "../pages/Agenda";
import RedefinirSenha from "../pages/RedefinirSenha";
import EsqueciSenha from "../pages/EsqueciSenha";
import Servicos from "../pages/Servicos";
import Pedidos from "../pages/Pedidos";
import ConfigLoja from "../pages/ConfigLoja";
import EditarLoja from "../pages/EditarLoja";
import EditarProduto from "../pages/EditarProduto";
import NovoCombo from "../pages/NovoCombo";

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
          <Route exact path="/redefinirsenha/:token" element={<RedefinirSenha/>} />
          <Route exact path="/agenda" element={<Private Item={Agenda} />} /> 
          <Route exact path="/pedidos" element={<Private Item={Pedidos} />} /> 
          <Route exact path="/servicos" element={<Private Item={Servicos} />} /> 
          <Route path="/esquecisenha" element={<EsqueciSenha/>} />
          <Route path="/loja/:id/config" element={<Private Item={ConfigLoja} />} />
          <Route path="/loja/:identificadorexterno/edit" element={<Private Item={EditarLoja} />} />
          <Route path="produto/:id/edit" element={<Private Item={EditarProduto} />} />
          <Route path="catalogo/produto/category/:IdCategoria" element={<Private Item={NovoCombo} />} />
          <Route path="/" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="*" element={<Signin />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
