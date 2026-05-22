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
      <img src={restaurant.image} alt={restaurant.name} className="card-image" />
      <div className="card-content">
        <h2>{restaurant.name}</h2>
        <p className="address">{restaurant.address}</p>
        <p className="description">{restaurant.description}</p>
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
