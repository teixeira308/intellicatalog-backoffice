// components/Toast.js
import React, { useState, useEffect } from "react";

const Toast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

    // Remove o toast automaticamente após 3 segundos
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 3000);
  };

  // Expor a função para ser usada globalmente
  useEffect(() => {
    window.addToast = addToast;
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            padding: "10px 15px",
            borderRadius: "5px",
            color: "white",
            backgroundColor: toast.type === "success"
              ? "#4caf50"
              : toast.type === "error"
              ? "#f44336"
              : toast.type === "warning"
              ? "#ff9800"
              : "#2196f3",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{toast.message}</span>
          <button
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "18px",
              cursor: "pointer",
              marginLeft: "10px",
            }}
            onClick={() => {
              setToasts((prevToasts) =>
                prevToasts.filter((t) => t.id !== toast.id)
              );
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
