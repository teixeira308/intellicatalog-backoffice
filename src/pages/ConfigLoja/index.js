import { useParams,Link } from "react-router-dom";

const ConfigLoja = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Configurações da Loja {id}</h1>
      <Link to="/">Voltar</Link>
    </div>
  );
};

export default ConfigLoja;
