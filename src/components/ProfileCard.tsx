import React from 'react';

export const ProfileCard: React.FC = () => {
  return (
    <aside className="restaurant-card cta-card">
      <div className="cta-avatar-wrapper">
        <img
          src="./IMG/EU.jpg"
          alt="Foto de Bruno Oliveira"
          className="card-image-cta"
          loading="lazy"
        />
      </div>
      <div className="card-content">
        <span className="card-tag card-tag-author">Criador do Guia</span>
        <h2>Bruno Oliveira</h2>
        <p className="description">
          Acompanhe meu estilo de vida, novidades gastronômicas e mais recomendações exclusivas de lugares incríveis para visitar em São Paulo.
        </p>
        <div className="card-divider" />
        <a 
          href="https://www.instagram.com/dinamite011/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="card-button card-button-primary cta-btn"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          Siga @dinamite011
        </a>
      </div>
    </aside>
  );
};