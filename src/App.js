import React from "react";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/auth";
import GlobalStyle from "./styles/global";
import Toast from "./components/Toast/Toast";

const App = () => (
  
  <AuthProvider>
    <Toast />
    <RoutesApp />
    <GlobalStyle />
  </AuthProvider>
);

export default App;
