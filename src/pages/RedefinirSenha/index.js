import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserApi from "../../services/userApi";
import * as C from "./styles";
import Button from "../../components/Button";
import loadingGif from '../../components/loading.gif';
import logo from '../../assets/logo.png'


const RedefinirSenha = () => {
    const { token } = useParams(); // Captura o token da URL
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [passwordStrength, setPasswordStrength] = useState({});
    const { updatePassword } = UserApi(); // Importa o serviço
    const [loading, setLoading] = useState(false); // Estado para o loading

    const handlePasswordChange = (password) => {
        setNewPassword(password);

        // Verifica os critérios de segurança
        const strength = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };
        setPasswordStrength(strength);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("entrou")
        setLoading(true); // Ativa o estado de loading
        if (newPassword !== confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        try {
            const response = await updatePassword(token, newPassword);
            setMessage(response.message);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); // Desativa o estado de loading
        }

    };


    return (
        <C.Container>
            <img
                src={logo}
                alt="Descrição da imagem"
                style={{ width: "300px", marginBottom: "20px", borderRadius: "20px" }}
            />
            <C.Title>Redefinir senha</C.Title>
            <C.Section>
                <C.Subtitle>Insira sua nova senha abaixo:</C.Subtitle>
                 
                    <C.Step>
                        <C.StepTitle>Nova senha</C.StepTitle>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            placeholder="Digite sua nova senha"
                            required
                            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                        />

                        {/* Div para exibir os critérios de segurança */}
                        <div style={{ marginBottom: "20px" }}>
                            <p style={{ color: passwordStrength.length ? "green" : "red" }}>
                                {passwordStrength.length ? "✔" : "✖"} Pelo menos 8 caracteres
                            </p>
                            <p style={{ color: passwordStrength.uppercase ? "green" : "red" }}>
                                {passwordStrength.uppercase ? "✔" : "✖"} Inclui letra maiúscula
                            </p>
                            <p style={{ color: passwordStrength.lowercase ? "green" : "red" }}>
                                {passwordStrength.lowercase ? "✔" : "✖"} Inclui letra minúscula
                            </p>
                            <p style={{ color: passwordStrength.number ? "green" : "red" }}>
                                {passwordStrength.number ? "✔" : "✖"} Inclui número
                            </p>
                            <p style={{ color: passwordStrength.specialChar ? "green" : "red" }}>
                                {passwordStrength.specialChar ? "✔" : "✖"} Inclui caractere especial
                            </p>
                        </div>

                        <C.StepTitle>Confirmar nova senha</C.StepTitle>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirme sua nova senha"
                            required
                            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                        />

                        {/* Div para exibir se as senhas coincidem */}
                        <div style={{ marginBottom: "20px", color: confirmPassword ? (confirmPassword === newPassword ? "green" : "red") : "black" }}>
                            {confirmPassword
                                ? confirmPassword === newPassword
                                    ? "✔ Senhas coincidem"
                                    : "✖ Senhas não coincidem"
                                : "Repita para confirmar a senha"}
                        </div>
                    </C.Step>

                    {loading ? (
                        <img src={loadingGif} alt="Carregando..." />
                    ) : (
                        //<Button type="submit" Text="Redefinir senha" />
                        <Button Text="Redefinir senha" onClick={handleSubmit} disabled={loading} />
                    )}
                    {message && <p style={{ color: "green" }}>{message}</p>}
                    {error && <C.labelError>{error}</C.labelError>}
                
            </C.Section>
        </C.Container>
    );
};

export default RedefinirSenha;
