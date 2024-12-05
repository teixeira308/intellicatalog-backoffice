import * as C from "./styles";

const EsqueciSenha = () => {

    return (
        <C.Container>
            <img src="favicon.png" alt="Descrição da imagem" style={{ width: '300px', marginBottom: '20px', borderRadius: '20px' }} />
            <C.Title>Esqueci minha senha</C.Title>
            <C.Section>
                <C.Subtitle>Insira seu e-mail abaixo:</C.Subtitle>
               

            </C.Section>
        </C.Container>
    );
};

export default EsqueciSenha;
