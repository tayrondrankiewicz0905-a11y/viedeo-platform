import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Play,
  Plus,
  Search,
  User,
  ChevronDown,
  Info,
  Check,
  Menu,
  X
} from "lucide-react";
import "./style.css";

const videos = [
  {
    id: 1,
    title: "VIEDEO ORIGINAL",
    category: "Empfohlen",
    description: "Willkommen auf deiner privaten Video-Plattform.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1400&q=80",
    duration: "1:24:18",
    featured: true
  },
  {
    id: 2,
    title: "Night Drive",
    category: "Filme",
    description: "Eine nächtliche Reise durch die Stadt.",
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80",
    duration: "48:21"
  },
  {
    id: 3,
    title: "The Journey",
    category: "Dokumentationen",
    description: "Eine Reise voller neuer Eindrücke.",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
    duration: "1:12:05"
  },
  {
    id: 4,
    title: "City Lights",
    category: "Filme",
    description: "Großstadt bei Nacht.",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80",
    duration: "36:44"
  },
  {
    id: 5,
    title: "Ocean",
    category: "Natur",
    description: "Die Schönheit des Meeres.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    duration: "52:13"
  },
  {
    id: 6,
    title: "Mountain",
    category: "Dokumentationen",
    description: "Hoch hinaus.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
    duration: "1:03:29"
  }
];

function App() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [myList, setMyList] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Alle");

  const categories = [
    "Alle",
    "Filme",
    "Dokumentationen",
    "Natur",
    "Empfohlen"
  ];

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const categoryMatch =
        activeCategory === "Alle" || video.category === activeCategory;

      const searchMatch =
        !search ||
        video.title.toLowerCase().includes(search.toLowerCase()) ||
        video.description.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [search, activeCategory]);

  function toggleList(id) {
    setMyList((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  const featured = videos.find((video) => video.featured);

  return (
    <div className="app">
      <header className="navbar">
        <div className="nav-left">
          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <div className="logo">VIEDEO</div>

          <nav className={menuOpen ? "nav-links open" : "nav-links"}>
            <button onClick={() => setActiveCategory("Alle")}>Startseite</button>
            <button onClick={() => setActiveCategory("Filme")}>Filme</button>
            <button
              onClick={() => setActiveCategory("Dokumentationen")}
            >
              Dokumentationen
            </button>
            <button onClick={() => setActiveCategory("Natur")}>Natur</button>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("Alle");
              }}
            >
              Meine Liste
            </button>
          </nav>
        </div>

        <div className="nav-right">
          <div className="search-box">
            <Search size={19} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Titel suchen..."
            />
          </div>

          <button className="profile-button">
            <User size={20} />
            <ChevronDown size={16} />
          </button>
        </div>
      </header>

      <main>
        <section
          className="hero"
          style={{ backgroundImage: `url(${featured.image})` }}
        >
          <div className="hero-overlay" />

          <div className="hero-content">
            <div className="hero-label">VIEDEO ORIGINAL</div>

            <h1>{featured.title}</h1>

            <p>
              {featured.description} Entdecke deine persönliche
              Video-Sammlung auf VIEDEO.
            </p>

            <div className="hero-meta">
              <span>2026</span>
              <span>•</span>
              <span>16+</span>
              <span>•</span>
              <span>{featured.duration}</span>
            </div>

            <div className="hero-buttons">
              <button className="play-button">
                <Play size={20} fill="currentColor" />
                Abspielen
              </button>

              <button
                className="info-button"
                onClick={() => toggleList(featured.id)}
              >
                {myList.includes(featured.id) ? (
                  <Check size={20} />
                ) : (
                  <Plus size={20} />
                )}
                Meine Liste
              </button>

              <button className="info-icon-button">
                <Info size={20} />
              </button>
            </div>
          </div>
        </section>

        <section className="content">
          <div className="category-bar">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  activeCategory === category ? "category active" : "category"
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="section-heading">
            <h2>
              {search
                ? `Suchergebnisse für „${search}“`
                : activeCategory === "Alle"
                  ? "Für dich ausgewählt"
                  : activeCategory}
            </h2>
          </div>

          {filteredVideos.length > 0 ? (
            <div className="video-grid">
              {filteredVideos.map((video) => {
                const saved = myList.includes(video.id);

                return (
                  <article className="video-card" key={video.id}>
                    <div className="thumbnail">
                      <img src={video.image} alt={video.title} />

                      <div className="thumbnail-gradient" />

                      <span className="duration">{video.duration}</span>

                      <button className="card-play">
                        <Play size={19} fill="currentColor" />
                      </button>

                      <button
                        className="card-list"
                        onClick={() => toggleList(video.id)}
                        aria-label="Meine Liste"
                      >
                        {saved ? (
                          <Check size={18} />
                        ) : (
                          <Plus size={18} />
                        )}
                      </button>
                    </div>

                    <div className="card-info">
                      <h3>{video.title}</h3>
                      <p>{video.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty">
              <Search size={40} />
              <h3>Keine Videos gefunden</h3>
              <p>Versuche einen anderen Suchbegriff.</p>
            </div>
          )}
        </section>
      </main>

      <footer>
        <strong>VIEDEO</strong>
        <span>Private Video-Plattform</span>
        <span>© 2026</span>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
