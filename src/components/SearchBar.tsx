import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  resultCount,
}) => {
  return (
    <div className="search-bar-wrapper">
      <div className="search-input-container">
        <svg
          className="search-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por restaurante, bairro (ex: Liberdade) ou prato..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Buscar restaurantes"
        />
        {value && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => onChange("")}
            title="Limpar busca"
            aria-label="Limpar campo de busca"
          >
            ✕
          </button>
        )}
      </div>
      <span className="search-results-counter">
        {resultCount} {resultCount === 1 ? "restaurante encontrado" : "restaurantes encontrados"}
      </span>
    </div>
  );
};
