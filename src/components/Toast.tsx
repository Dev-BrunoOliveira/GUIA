import React from "react";

interface ToastProps {
  message: string | null;
  type?: "success" | "info";
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = "info", onClose }) => {
  if (!message) return null;

  return (
    <div className={`toast-notification toast-${type}`}>
      <span className="toast-icon">{type === "success" ? "✨" : "ℹ️"}</span>
      <span className="toast-message">{message}</span>
      <button className="toast-close-btn" onClick={onClose} aria-label="Fechar notificação">
        ✕
      </button>
    </div>
  );
};
