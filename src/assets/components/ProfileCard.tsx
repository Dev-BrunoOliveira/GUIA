import React from 'react';

export const ProfileCard: React.FC = () => {
  return (
    <div className="restaurant-card cta-card">
      <img src="./IMG/EU.jpg" alt="Foto de Bruno Oliveira" className="card-image-cta" />
      <div className="card-content">
        <h2>Me acompanhe no Instagram</h2>
        <p className="description">
          No meu perfil você acompanha meu lifestyle e mais dicas de vivências e restaurantes em São Paulo.
        </p>
        <a 
          href="https://www.instagram.com/dinamite011/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="card-button"
        >
          @dinamite011
        </a>
      </div>
    </div>
  );
};