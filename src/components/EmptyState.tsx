import React from "react";

interface EmptyStateProps {
  onReset: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onReset }) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">🍽️</div>
      <h3>Nenhum restaurante encontrado</h3>
      <p>Tente buscar por outro termo, selecionar outra categoria ou limpar seus filtros.</p>
      <button className="reset-filters-btn" onClick={onReset}>
        Limpar Filtros e Busca
      </button>
    </div>
  );
};
