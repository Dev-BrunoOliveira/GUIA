import React, { memo } from "react";
import type { Restaurant } from "../types";

interface RestaurantCardProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelect: (restaurant: Restaurant) => void;
}

const RestaurantCardComponent: React.FC<RestaurantCardProps> = ({
  restaurant,
  isFavorite,
  onToggleFavorite,
  onSelect,
}) => {
  return (
    <article className="restaurant-card" onClick={() => onSelect(restaurant)}>
      <div className="card-image-wrapper">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="card-image"
          loading="lazy"
          decoding="async"
        />
        <div className="card-image-badges">
          {restaurant.rating && (
            <span className="badge-rating" title={`Nota: ${restaurant.rating}`}>
              ⭐ {restaurant.rating.toFixed(1)}
            </span>
          )}
          {restaurant.priceRange && (
            <span className="badge-price" title={`Faixa de preço: ${restaurant.priceRange}`}>
              {restaurant.priceRange}
            </span>
          )}
        </div>

        <button
          className={`card-heart-btn ${isFavorite ? "favorite" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(restaurant.id);
          }}
          title={isFavorite ? "Remover dos Favoritos" : "Salvar nos Favoritos"}
          aria-label="Favoritar restaurante"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="card-content">
        <div className="card-header-tags">
          {restaurant.category && (
            <span className="card-tag">{restaurant.category}</span>
          )}
          {restaurant.neighborhood && (
            <span className="card-neighborhood">📍 {restaurant.neighborhood}</span>
          )}
        </div>

        <h2>{restaurant.name}</h2>
        <p className="address">{restaurant.address}</p>
        <p className="description">{restaurant.description}</p>

        {restaurant.highlights && restaurant.highlights.length > 0 && (
          <div className="card-highlights">
            <span className="highlights-title">Pratos recomendados:</span>
            <div className="highlights-list">
              {restaurant.highlights.slice(0, 2).map((dish, i) => (
                <span key={i} className="highlight-chip">
                  {dish}
                </span>
              ))}
              {restaurant.highlights.length > 2 && (
                <span className="highlight-chip more-chip">
                  +{restaurant.highlights.length - 2}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="card-divider" />

        <div className="card-actions" onClick={(e) => e.stopPropagation()}>
          <button
            className="card-button card-button-secondary"
            onClick={() => onSelect(restaurant)}
            title="Ver detalhes completos"
          >
            Ver Detalhes
          </button>
          <a
            href={restaurant.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="card-button card-button-primary"
            title="Visitar perfil no Instagram"
          >
            Instagram
          </a>
        </div>
      </div>
    </article>
  );
};

export const RestaurantCard = memo(RestaurantCardComponent, (prevProps, nextProps) => {
  return (
    prevProps.restaurant.id === nextProps.restaurant.id &&
    prevProps.isFavorite === nextProps.isFavorite
  );
});
