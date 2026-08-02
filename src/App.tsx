import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { restaurantsData } from "./data/restaurants";
import type { Restaurant } from "./types";
import { RestaurantCard } from "./components/RestaurantCard";
import { ProfileCard } from "./components/ProfileCard";
import { SearchBar } from "./components/SearchBar";
import { EmptyState } from "./components/EmptyState";
import { ThemeToggle } from "./components/ThemeToggle";
import { RestaurantModal } from "./components/RestaurantModal";
import { StatsBanner } from "./components/StatsBanner";
import { Toast } from "./components/Toast";

export default function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeNeighborhood, setActiveNeighborhood] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"default" | "rating" | "name">(
    "default",
  );

  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem("guia_theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("guia_theme", theme);
  }, [theme]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const categoriesWithCount = useMemo(() => {
    const counts: Record<string, number> = {};
    restaurantsData.forEach((r) => {
      if (r.category) {
        counts[r.category] = (counts[r.category] || 0) + 1;
      }
    });

    const categoryList = Object.keys(counts).map((cat) => ({
      label: cat,
      value: cat,
      count: counts[cat],
    }));

    return [
      { label: "Todos", value: "all", count: restaurantsData.length },
      ...categoryList,
    ];
  }, []);

  const neighborhoods = useMemo(() => {
    const list = Array.from(
      new Set(restaurantsData.map((r) => r.neighborhood).filter(Boolean)),
    ) as string[];
    return ["all", ...list.sort()];
  }, []);

  const filteredRestaurants = useMemo(() => {
    let result = restaurantsData.filter((restaurant) => {
      if (activeCategory !== "all" && restaurant.category !== activeCategory) {
        return false;
      }

      if (
        activeNeighborhood !== "all" &&
        restaurant.neighborhood !== activeNeighborhood
      ) {
        return false;
      }

      if (priceFilter !== "all" && restaurant.priceRange !== priceFilter) {
        return false;
      }

      const term = searchTerm.toLowerCase().trim();
      const matchSearch =
        !term ||
        restaurant.name.toLowerCase().includes(term) ||
        restaurant.description.toLowerCase().includes(term) ||
        restaurant.address.toLowerCase().includes(term) ||
        (restaurant.category &&
          restaurant.category.toLowerCase().includes(term)) ||
        (restaurant.neighborhood &&
          restaurant.neighborhood.toLowerCase().includes(term)) ||
        (restaurant.highlights &&
          restaurant.highlights.some((h) => h.toLowerCase().includes(term)));

      return matchSearch;
    });

    if (sortBy === "rating") {
      result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [activeCategory, activeNeighborhood, priceFilter, searchTerm, sortBy]);

  const scrollToGrid = useCallback(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile && gridRef.current) {
      const headerOffset = 80;
      const elementPosition = gridRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  const handleCategoryChange = useCallback(
    (categoryValue: string) => {
      setActiveCategory(categoryValue);
      scrollToGrid();
    },
    [scrollToGrid],
  );

  const handleResetFilters = useCallback(() => {
    setSearchTerm("");
    setActiveCategory("all");
    setActiveNeighborhood("all");
    setPriceFilter("all");
    setSortBy("default");
  }, []);


  const handleShare = useCallback(
    (restaurant: Restaurant) => {
      if (navigator.share) {
        navigator
          .share({
            title: restaurant.name,
            text: `Confira ${restaurant.name} no Guia de Restaurantes!`,
            url: window.location.href,
          })
          .catch(() => {});
      } else {
        navigator.clipboard.writeText(
          `${restaurant.name} - ${restaurant.address}`,
        );
        showToast(
          `Link de ${restaurant.name} copiado para a área de transferência!`,
        );
      }
    },
    [showToast],
  );

  const handleCloseModal = useCallback(() => {
    setSelectedRestaurant(null);
  }, []);

  const handleCloseToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  return (
    <div className="app-container">
      <Toast message={toastMessage} onClose={handleCloseToast} />

      <header className="hero">
        <div className="hero-top-bar">
          <span className="hero-eyebrow">Gastronomia em SP</span>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>

        <div className="hero-content">
          <h1>
            Meu Guia de <em>Restaurantes</em>
          </h1>
          <p>
            Recomendações pessoais de experiências gastronômicas incríveis em
            São Paulo.
          </p>

          <StatsBanner restaurants={restaurantsData} />
        </div>
      </header>

      <main>
        {/* Search Bar */}
        <section className="search-section">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            resultCount={filteredRestaurants.length}
          />
        </section>

        {/* Filters and Controls */}
        <section className="controls-section">
          {/* Scrollable Category Chips */}
          <div className="category-scroll-container">
            {categoriesWithCount.map((cat) => (
              <button
                key={cat.value}
                className={`filter-btn ${activeCategory === cat.value ? "active" : ""}`}
                onClick={() => handleCategoryChange(cat.value)}
              >
                <span>{cat.label}</span>
                <span className="chip-count">{cat.count}</span>
              </button>
            ))}
          </div>

          {/* Secondary Controls (Neighborhood, Price, Sorting) */}
          <div className="secondary-filters">
            <div className="select-group">
              <label htmlFor="neighborhood-select">Bairro:</label>
              <select
                id="neighborhood-select"
                className="custom-select"
                value={activeNeighborhood}
                onChange={(e) => setActiveNeighborhood(e.target.value)}
              >
                <option value="all">Todos os Bairros</option>
                {neighborhoods
                  .filter((n) => n !== "all")
                  .map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
              </select>
            </div>

            <div className="select-group">
              <label htmlFor="price-select">Preço:</label>
              <select
                id="price-select"
                className="custom-select"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option value="all">Qualquer Preço</option>
                <option value="$">$ (Econômico)</option>
                <option value="$$">$$ (Moderado)</option>
                <option value="$$$">$$$ (Sofisticado)</option>
              </select>
            </div>

            <div className="select-group">
              <label htmlFor="sort-select">Ordenar:</label>
              <select
                id="sort-select"
                className="custom-select"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "default" | "rating" | "name")
                }
              >
                <option value="default">Recomendados</option>
                <option value="rating">Melhores Notas (⭐)</option>
                <option value="name">Nome (A - Z)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Restaurant Grid or Empty State */}
        <section className="grid-section" ref={gridRef}>
          {filteredRestaurants.length > 0 ? (
            <div className="restaurant-grid">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onSelect={setSelectedRestaurant}
                />
              ))}
              <ProfileCard />
            </div>
          ) : (
            <EmptyState onReset={handleResetFilters} />
          )}
        </section>
      </main>

      {/* Restaurant Detail Modal */}
      <RestaurantModal
        restaurant={selectedRestaurant}
        onClose={handleCloseModal}
        onShare={handleShare}
      />

      <footer>
        <div className="footer-content">
          <p>
            &copy; {new Date().getFullYear()} -{" "}
            <strong>Meu Guia de Restaurantes</strong>, criado com ❤️ por Bruno
            Oliveira.
          </p>
          <a
            href="https://www.instagram.com/dinamite011/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            @dinamite011
          </a>
        </div>
      </footer>
    </div>
  );
}
