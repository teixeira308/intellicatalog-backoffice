import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import userApi from "../../services/userApi";
import * as C from "./styles";

const RedefinirSenha = () => {

    const { token } = useParams(); // Captura o token da URL
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const { updatePassword } = userApi(); // Importa o serviço


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

            <C.Title>Redefinir senha</C.Title>
            <img src="favicon.png" alt="Descrição da imagem" style={{ width: '300px', marginBottom: '20px', borderRadius: '20px' }} />
            <C.Section>
                <C.Subtitle>Insira sua nova senha abaixo:</C.Subtitle>
                {message && <p style={{ color: "green" }}>{message}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <C.Step>
                        <C.StepTitle>Nova senha</C.StepTitle>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Digite sua nova senha"
                            required
                            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                        />
                    </C.Step>

                    <C.Step>
                        <C.StepTitle>Confirmar nova senha</C.StepTitle>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirme sua nova senha"
                            required
                            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                        />
                    </C.Step>

                    <button
                        type="submit"
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#007BFF",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Redefinir senha
                    </button>
                </form>

            </C.Section>
        </C.Container>
    );
};

export default RedefinirSenha;
