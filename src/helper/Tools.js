const logMessage = (message) => {
    // Calculando GMT-3
    const now = new Date();
    const offset = -3 * 60 * 60 * 1000; 
    const gmtMinus3Date = new Date(now.getTime() + offset);
    
    // Log de sistema
    console.log(gmtMinus3Date.toUTCString(), "->", message);
};

// Exportando para uso no React
export default logMessage;
