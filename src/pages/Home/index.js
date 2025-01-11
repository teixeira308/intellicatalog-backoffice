import React from "react";
import { Box, Typography, Container, Grid, Card, CardContent, CardHeader } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";

const steps = [
  {
    title: "1. Crie suas categorias",
    description: "Entre no menu catálogo e crie sua primeira categoria.",
  },
  {
    title: "2. Registre seus produtos",
    description: "Após criar sua primeira categoria, registre seu produto e adicione imagens.",
  },
  {
    title: "3. Administre seu catálogo online",
    description: "Controle quais produtos estão disponíveis e a ordem das categorias no seu catálogo.",
  },
  {
    title: "4. Administre sua loja",
    description: "Personalize seu catálogo e receba os pedidos no WhatsApp.",
  },
];

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Navbar />
      <Box textAlign="center" my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bem-vindo ao Vitrine Smart
        </Typography>
        <Typography variant="h6" component="h2" color="textSecondary">
          Vamos começar?
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {steps.map((step, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={3} sx={{ height: "100%" }}>
              <CardHeader
                title={step.title}
                titleTypographyProps={{ variant: "h6", component: "h3" }}
                sx={{ bgcolor: "primary.main", color: "white", textAlign: "center" }}
              />
              <CardContent>
                <Typography variant="body1" color="textSecondary">
                  {step.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
