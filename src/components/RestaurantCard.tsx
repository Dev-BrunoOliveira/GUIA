import React from "react";
import type { Restaurant } from "../types";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
}) => {
  return (
    <div className="restaurant-card">
      <div className="card-image-wrapper">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="card-image"
        />
      </div>
      <div className="card-content">
        {restaurant.category && (
          <span className="card-tag">{restaurant.category}</span>
        )}
        <h2>{restaurant.name}</h2>
        <p className="address">{restaurant.address}</p>
        <p className="description">{restaurant.description}</p>
        <div className="card-divider" />
        <a
          href={restaurant.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="card-button"
        >
          Visite o Instagram
        </a>
      </div>
    </div>
  );
};
