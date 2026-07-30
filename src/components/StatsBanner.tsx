import React, { useMemo } from "react";
import type { Restaurant } from "../types";

interface StatsBannerProps {
  restaurants: Restaurant[];
}

export const StatsBanner: React.FC<StatsBannerProps> = ({ restaurants }) => {
  const stats = useMemo(() => {
    const total = restaurants.length;
    const neighborhoodsCount = new Set(
      restaurants.map((r) => r.neighborhood).filter(Boolean)
    ).size;
    const categoriesCount = new Set(
      restaurants.map((r) => r.category).filter(Boolean)
    ).size;
    
    const validRatings = restaurants.map((r) => r.rating).filter((r): r is number => r !== undefined);
    const avgRating = validRatings.length > 0
      ? (validRatings.reduce((acc, curr) => acc + curr, 0) / validRatings.length).toFixed(1)
      : "5.0";

    return {
      total,
      neighborhoodsCount,
      categoriesCount,
      avgRating,
    };
  }, [restaurants]);

  return (
    <div className="stats-banner">
      <div className="stat-item">
        <span className="stat-value">{stats.total}</span>
        <span className="stat-label">Restaurantes</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-value">{stats.neighborhoodsCount}</span>
        <span className="stat-label">Bairros em SP</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-value">{stats.categoriesCount}</span>
        <span className="stat-label">Cozinhas</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-value">⭐ {stats.avgRating}</span>
        <span className="stat-label">Média das Notas</span>
      </div>
    </div>
  );
};
