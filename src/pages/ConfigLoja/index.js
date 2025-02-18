import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LojaApi from "../../services/lojaApi";
import Navbar from "../../components/Navbar/Navbar";
import { NumericFormat } from 'react-number-format';
import * as C from "./styles";
import {
  Container,
  Typography,
  Button,
  Select,
  MenuItem,
  IconButton,
  Card,
  CardContent,
  Box,
  Stack,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ConfigLoja = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getLojaConfig, updateLojaConfig } = LojaApi();
  const [formData, setFormData] = useState({
    cor_primaria: "",
    cor_secundaria: "",
    taxa_entrega: "",
    numero_whatsapp: "",
    instagram: "",
    facebook: "",
    usa_Status: "",
    chave_pix: "",
    usa_estoque: false,  // Definido como booleano
    cor_botao_primaria: "",
    cor_botao_secundaria: "",
    usa_logo_fundo: false,
    calcula_taxa_entrega_posterior: false,
    cor_preco: "",
    cor_preco_promocional: ""
  });

  const filterFormData = (data) => {
    // Campos permitidos
    const allowedFields = [
      'cor_primaria',
      'cor_secundaria',
      'cor_botao_primaria',
      'cor_botao_secundaria',
      'taxa_entrega',
      'numero_whatsapp',
      'instagram',
      'facebook',
      'usa_Status',
      'chave_pix',
      'usa_estoque',
      'usa_logo_fundo',
      'calcula_taxa_entrega_posterior',
      'cor_preco',
      'cor_preco_promocional'
    ];

    // Filtra os dados mantendo apenas os campos permitidos
    return Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );
  };

  const loadStoreConfigs = async (id) => {
    try {
      const response = await getLojaConfig(id);
      return response;
    } catch (error) {
      console.error("Erro ao carregar configuração da loja:", error);
      window.addToast("Ocorreu um erro ao carregar configuração da loja: " + error, "error");
    }
  }

  useEffect(() => {
    const fetchStoreConfigs = async () => {
      console.log(id)
      if (id) {

        const storeConfigs = await loadStoreConfigs(id);

        // Converte as strings "true" e "false" em booleanos
        const transformedConfigs = {
          ...storeConfigs,
          usa_logo_fundo: storeConfigs.usa_logo_fundo === "true", // Converte "true" para true e "false" para false
          usa_Status: storeConfigs.usa_Status === "true", // Se você tiver essa propriedade
          usa_estoque: storeConfigs.usa_estoque === "true", // Se você tiver essa propriedade
          calcula_taxa_entrega_posterior: storeConfigs.calcula_taxa_entrega_posterior === "true" // Se você tiver essa propriedade
        };

        setFormData((prev) => ({
          ...prev,
          ...transformedConfigs // Atualiza com dados da loja, mantendo os campos existentes
        }));
      }
    };

    fetchStoreConfigs();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeCheckBox = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,  // Manipula o checkbox como booleano
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transformedData = {
        ...formData,
        usa_logo_fundo: formData.usa_logo_fundo ? "true" : "false", // Converte booleano de volta para string
        usa_estoque: formData.usa_estoque ? "true" : "false",  // Converte booleano de volta para string
        calcula_taxa_entrega_posterior: formData.calcula_taxa_entrega_posterior ? "true" : "false"  // Converte booleano de volta para string
      };

      // Filtra os dados que serão enviados
      const filteredData = filterFormData(transformedData);
      await updateLojaConfig(id, filteredData);
      window.addToast("Ação realizada com sucesso!", "success");
      navigate(-1); // Volta para a página anterior
    } catch (error) {
      console.error("Erro ao editar loja:", error);
      window.addToast("Ocorreu um erro ao editar configurações da loja: " + error, "error");
    }
  };


  if (!id) return <p>Carregando...</p>;

  return (

    <C.Container>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Navbar />
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <IconButton onClick={() => navigate(-1)} sx={{ marginRight: "8px" }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom sx={{ flexGrow: 1, textAlign: "center" }}>
            Configurações da Loja
          </Typography>
        </Box>


        <C.ModalForm onSubmit={handleSubmit}>
          Cores: <br /><br />
          <C.FormRow>
            <C.FormColumn style={{ flex: 1 }}>
              <C.Label htmlFor="cor_primaria">Tela</C.Label>
              <TextField
                type="color"
                name="cor_primaria"
                id="cor_primaria"
                value={formData.cor_primaria}
                onChange={handleChange}
                fullWidth
                sx={{ marginRight: '10px' }}
              />
            </C.FormColumn>
            <C.FormColumn>
              <C.Label htmlFor="cor_secundaria">Fonte</C.Label>
              <TextField
                type="color"
                name="cor_secundaria"
                id="cor_secundaria"
                value={formData.cor_secundaria}
                onChange={handleChange}
                fullWidth
                sx={{ marginRight: '10px' }}
              />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="cor_botao_primaria">Botão primária</C.Label>
              <TextField
                type="color"
                name="cor_botao_primaria"
                id="cor_botao_primaria"
                value={formData.cor_botao_primaria}
                onChange={handleChange}
                fullWidth
                sx={{ marginRight: '10px' }}
              />
            </C.FormColumn>
            <C.FormColumn>
              <C.Label htmlFor="cor_botao_secundaria">Botão secundária</C.Label>
              <TextField
                type="color"
                name="cor_botao_secundaria"
                id="cor_botao_secundaria"
                value={formData.cor_botao_secundaria}
                onChange={handleChange}
                fullWidth
                sx={{ marginRight: '10px' }}
              />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="cor_botao_primaria">Cor do Preço</C.Label>
              <TextField
                type="color"
                name="cor_preco"
                id="cor_preco"
                value={formData.cor_preco}
                onChange={handleChange}
                fullWidth
                sx={{ marginRight: '10px' }}
              />
            </C.FormColumn>
            <C.FormColumn>
              <C.Label htmlFor="cor_botao_secundaria">Cor do Preço Promocional</C.Label>
              <TextField
                type="color"
                name="cor_preco_promocional"
                id="cor_preco_promocional"
                value={formData.cor_preco_promocional}
                onChange={handleChange}
                fullWidth
                sx={{ marginRight: '10px' }}
              />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <div style={{
              backgroundColor: 'white',
              padding: '5px',
              textAlign: 'center',
              borderBottom: '1px solid #ddd',
              border: '1px'
            }}>
              <span style={{ textDecoration: 'line-through', color: 'red', fontSize: '10px' }}>
                R$20.00
              </span>
              <br />
              Preço promocional <span style={{ color: formData.cor_preco_promocional, fontSize: '15px' }}>
                R$10,00
              </span>
              &nbsp;
              <span style={{ color: 'green', fontSize: '15px' }}>
                50% de desconto
              </span>
              <br />
              <span style={{ color: formData.cor_preco, fontSize: '15px' }}>
                Preço R$10.00
              </span>
            </div>
            </C.FormRow>
            <C.FormRow>
            <div style={{
              height: '30px',
              backgroundColor: formData.cor_primaria,
              borderColor: formData.cor_botao_primaria,
              color: formData.cor_secundaria,
              display: 'flex',                // Adiciona o display flex
              justifyContent: 'center',       // Centraliza os botões horizontalmente
              alignItems: 'center'            // Centraliza os botões verticalmente
            }}>
              <button onClick={(e) => e.preventDefault()} style={{ backgroundColor: formData.cor_botao_primaria, borderColor: formData.cor_botao_primaria, color: formData.cor_secundaria, marginRight: '10px' }}>
                Meu carrinho</button>

              <button onClick={(e) => e.preventDefault()} style={{ backgroundColor: formData.cor_botao_secundaria, borderColor: formData.cor_botao_secundaria, color: formData.cor_secundaria }}>
                Finalizar Pedido</button>
            </div>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <FormControlLabel
                control={
                  <Checkbox
                    name="usa_logo_fundo"
                    id="usa_logo_fundo"
                    checked={formData.usa_logo_fundo}
                    onChange={handleChangeCheckBox}
                  />
                }
                label="Usar logo de fundo"
              />
            </C.FormColumn>
            <C.FormColumn>
              <FormControlLabel
                control={
                  <Checkbox
                    name="usa_estoque"
                    id="usa_estoque"
                    checked={formData.usa_estoque}
                    onChange={handleChangeCheckBox}
                  />
                }
                label="Usa estoque"
              />
            </C.FormColumn>

          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <FormControlLabel
                control={
                  <Checkbox
                    name="calcula_taxa_entrega_posterior"
                    id="calcula_taxa_entrega_posterior"
                    checked={formData.calcula_taxa_entrega_posterior}
                    onChange={handleChangeCheckBox}
                  />
                }
                label="Calcula envio posteriormente"
              />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <NumericFormat
                customInput={TextField}
                label="Taxa de entrega"
                name="taxa_entrega"
                id="taxa_entrega"
                value={formData.taxa_entrega}
                onValueChange={(values) => {
                  const { value } = values; // Obtém o valor numérico
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    taxa_entrega: value, // Atualiza o valor no formData
                  }));
                }}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale
                prefix="R$ "
                placeholder="R$ 0,00"
                fullWidth
                sx={{ mb: 2 }} // Espaçamento inferior
              />
            </C.FormColumn>
            <C.FormColumn>
              <TextField
                label="Whatsapp para receber pedidos"
                name="numero_whatsapp"
                id="numero_whatsapp"
                value={formData.numero_whatsapp}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
                required
              />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <TextField
                label="Instagram"
                name="instagram"
                id="instagram"
                value={formData.instagram}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <TextField
                label="Facebook"
                name="facebook"
                id="facebook"
                value={formData.facebook}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <Box display="flex" justifyContent="center">
              <Button type="submit" color="success" variant="contained">Salvar</Button>
            </Box>
          </C.FormRow>
        </C.ModalForm>
      </Container>
    </C.Container >
  );
};

export default ConfigLoja;
