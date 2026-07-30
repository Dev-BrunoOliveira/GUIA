import React from "react";
import type { Restaurant } from "../types";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
}) => {
  return (
    <article className="restaurant-card">
      <div className="card-image-wrapper">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="card-image"
          loading="lazy"
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
              {restaurant.highlights.map((dish, i) => (
                <span key={i} className="highlight-chip">
                  {dish}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="card-divider" />

        <div className="card-actions">
          {restaurant.googleMapsUrl && (
            <a
              href={restaurant.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-button card-button-secondary"
              title="Ver localização no mapa"
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
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Mapa
            </a>
          )}
          <a
            href={restaurant.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="card-button card-button-primary"
            title="Visitar perfil no Instagram"
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
            Instagram
          </a>
        </div>
      </div>
    </article>
  );
};
