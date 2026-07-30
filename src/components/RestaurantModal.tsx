import React, { useEffect } from "react";
import type { Restaurant } from "../types";

interface RestaurantModalProps {
  restaurant: Restaurant | null;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
  onShare: (restaurant: Restaurant) => void;
}

export const RestaurantModal: React.FC<RestaurantModalProps> = ({
  restaurant,
  isFavorite,
  onToggleFavorite,
  onClose,
  onShare,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (restaurant) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [restaurant, onClose]);

  if (!restaurant) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          ✕
        </button>

        <div className="modal-header-image">
          <img src={restaurant.image} alt={restaurant.name} />
          <div className="modal-image-overlay" />
          
          <button
            className={`modal-favorite-btn ${isFavorite ? "active" : ""}`}
            onClick={() => onToggleFavorite(restaurant.id)}
            title={isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
          >
            {isFavorite ? "❤️ Favoritado" : "🤍 Favoritar"}
          </button>

          <div className="modal-badges">
            {restaurant.rating && (
              <span className="badge-rating">⭐ {restaurant.rating.toFixed(1)}</span>
            )}
            {restaurant.priceRange && (
              <span className="badge-price">{restaurant.priceRange}</span>
            )}
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-tags">
            {restaurant.category && (
              <span className="card-tag">{restaurant.category}</span>
            )}
            {restaurant.neighborhood && (
              <span className="card-neighborhood">📍 {restaurant.neighborhood}</span>
            )}
          </div>

          <h2 id="modal-title">{restaurant.name}</h2>
          <p className="modal-address">📍 {restaurant.address}</p>

          <div className="modal-description-box">
            <h3>💬 Dica do Bruno</h3>
            <p>{restaurant.description}</p>
          </div>

          {restaurant.highlights && restaurant.highlights.length > 0 && (
            <div className="modal-section">
              <h4>🍽️ Pratos Recomendados</h4>
              <div className="modal-chips">
                {restaurant.highlights.map((dish, i) => (
                  <span key={i} className="highlight-chip-lg">
                    {dish}
                  </span>
                ))}
              </div>
            </div>
          )}

          {restaurant.features && restaurant.features.length > 0 && (
            <div className="modal-section">
              <h4>✨ Diferenciais & Ambiente</h4>
              <div className="modal-chips">
                {restaurant.features.map((feat, i) => (
                  <span key={i} className="feature-chip">
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="modal-actions-row">
            <button
              className="modal-action-btn share-btn"
              onClick={() => onShare(restaurant)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              Compartilhar
            </button>

            {restaurant.googleMapsUrl && (
              <a
                href={restaurant.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-action-btn maps-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Abrir no Mapa
              </a>
            )}

            <a
              href={restaurant.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-action-btn instagram-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
