import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserApi from "../../services/userApi";
import * as C from "./styles";

const RedefinirSenha = () => {

    const { token } = useParams(); // Captura o token da URL
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const { updatePassword } = UserApi(); // Importa o serviço


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        try {
            const response = await updatePassword(token, newPassword);
            setMessage(response.message);
            setError("");

            // Opcional: Redirecionar após sucesso
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (err) {
            setError(err);
            setMessage("");
        }
    };

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

export default RedefinirSenha;
