import React from "react";

interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      className="theme-toggle-btn"
      onClick={onToggle}
      title={theme === "light" ? "Alternar para Modo Escuro" : "Alternar para Modo Claro"}
      aria-label="Alternar tema da página"
    >
      {theme === "light" ? (
        <>
          <span className="theme-icon">🌙</span>
          <span className="theme-text">Modo Escuro</span>
        </>
      ) : (
        <>
          <span className="theme-icon">☀️</span>
          <span className="theme-text">Modo Claro</span>
        </>
      )}
    </button>
  );
};
