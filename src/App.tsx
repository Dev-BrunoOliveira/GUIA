import { useState, useRef } from "react";
import { restaurantsData } from "./data/restaurants";
import { RestaurantCard } from "./components/RestaurantCard";
import { ProfileCard } from "./components/ProfileCard";

const CATEGORIES = [
  { label: "Todos", value: "all" },
  { label: "Culinária Japonesa", value: "Culinária Japonesa" },
  { label: "Hambúrguer", value: "Hambúrguer" },
  { label: "Frutos do Mar", value: "Frutos do Mar" },
  { label: "Pastrami", value: "Pastrami" },
  { label: "Árabe", value: "Culinária Árabe" },
  { label: "Comida Mineira", value: "Comida Mineira" },
  { label: "Culinária Nordestina", value: "Culinária Nordestina" },
  { label: "Culinária Chinesa", value: "Culinária Chinesa" },
  { label: "Churrasco Coreano", value: "Churrasco Coreano" },
  { label: "Culinária Italiana", value: "Culinária Italiana" }, 
  { label: "Culinária Tailandesa", value: "Culinária Tailandesa" },
];

export default function App() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const gridRef = useRef<HTMLDivElement>(null);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile && gridRef.current) {
      const headerOffset = 120;
      const elementPosition = gridRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const filteredRestaurants =
    activeFilter === "all"
      ? restaurantsData
      : restaurantsData.filter((resto) => resto.category === activeFilter);

  return (
    <>
      <header className="hero">
        <div className="hero-content">
          <h1>Meu Guia de Restaurantes</h1>
          <p>
            Compartilhando experiências incríveis de lugares que visitei em São
            Paulo
          </p>
        </div>
      </header>

      <main>
        <div className="filter-container">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              className={`filter-btn ${activeFilter === cat.value ? "active" : ""}`}
              onClick={() => handleFilterChange(cat.value)}
            >
              {cat.label}
            </button>
          ))}

          <div className="filter-select-container">
            <select
              id="filter-select"
              className="filter-select"
              value={activeFilter}
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="restaurant-grid" ref={gridRef}>
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={{
                ...restaurant,
                instagramUrl: restaurant.instagramUrl || "",
              }}
            />
          ))}

          
          <ProfileCard />
        </div>
      </main>

      <footer>
        <p>
          &copy; {new Date().getFullYear()} - Meu Guia de Restaurantes, criado
          por Bruno Oliveira.
        </p>
      </footer>
    </>
  );
}
