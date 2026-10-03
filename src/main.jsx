import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search,
  Play,
  Plus,
  Check,
  User,
  Settings,
  Shield,
  LogOut,
  ChevronRight,
  Clock,
  Menu,
  X
} from "lucide-react";
import "./style.css";

const videos = [
  {
    id: 1,
    title: "Willkommen bei Viedeo",
    category: "Featured",
    description:
      "Deine private Video-Plattform. Videos ansehen, weiterschauen und deine persönliche Liste verwalten.",
    duration: "1:24:32",
    progress: 42,
    featured: true
  },
  {
    id: 2,
    title: "Sommer 2026",
    category: "Momente",
    description: "Besondere Momente und Erinnerungen.",
    duration: "48:16",
    progress: 12
  },
  {
    id: 3,
    title: "Deutschland Tour",
    category: "Reisen",
    description: "Eine Reise durch Deutschland.",
    duration: "1:36:08",
    progress: 0
  },
  {
    id: 4,
    title: "Gaming Session",
    category: "Gaming",
    description: "Lange Gaming-Session mit Freunden.",
    duration: "2:18:44",
    progress: 67
  },
  {
    id: 5,
    title: "Best Moments",
    category: "Momente",
    description: "Die besten Clips gesammelt.",
    duration: "35:51",
    progress: 0
  },
  {
    id: 6,
    title: "Abenteuer",
    category: "Reisen",
    description: "Neue Orte und neue Erinnerungen.",
    duration: "1:12:27",
    progress: 24
  }
];

function App() {
  const [approved, setApproved] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [search, setSearch] = useState("");
  const [myList, setMyList] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return videos;
    return videos.filter((v) =>
      `${v.title} ${v.category} ${v.description}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  const toggleList = (id) => {
    setMyList((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  if (!approved) {
    return (
      <div className="auth-screen">
        <div className="auth-card">
          <div className="logo">VIEDEO</div>
          <h1>Deine private Videoplattform</h1>
          <p>
            Melde dich mit deinem Google-Konto an. Neue Benutzer werden vor
            dem Zugriff auf die Videos durch einen Administrator freigeschaltet.
          </p>

          <button className="google-button" onClick={() => setApproved(false)}>
            <span className="google-icon">G</span>
            Mit Google anmelden
          </button>

          <div className="demo-box">
            <strong>Demo-Modus</strong>
            <span>
              In der späteren Version wird die Freigabe automatisch über das
              Backend geprüft.
            </span>
            <button onClick={() => setApproved(true)}>
              Demo-Benutzer genehmigen
            </button>
          </div>
        </div>
      </div>
    );
  }

  const featured = videos.find((v) => v.featured);

  return (
    <div className="app">
      <header className="navbar">
        <div className="brand">VIEDEO</div>

        <nav className={mobileMenu ? "nav-links open" : "nav-links"}>
          <button>Startseite</button>
          <button>Filme & Videos</button>
          <button>Meine Liste</button>
          {admin && <button onClick={() => alert("Admin-Bereich")}>Admin</button>}
        </nav>

        <div className="nav-actions">
          <div className="search">
            <Search size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Suchen"
            />
          </div>

          <button className="icon-button">
            <User size={20} />
          </button>

          <button
            className="icon-button mobile-toggle"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">VIEDEO ORIGINAL</span>
            <h1>{featured.title}</h1>
            <p>{featured.description}</p>

            <div className="hero-meta">
              <span>2026</span>
              <span>•</span>
              <span>HD</span>
              <span>•</span>
              <span>{featured.duration}</span>
            </div>

            <div className="hero-buttons">
              <button className="primary-button" onClick={() => setSelected(featured)}>
                <Play size={19} fill="currentColor" />
                Abspielen
              </button>

              <button
                className="secondary-button"
                onClick={() => toggleList(featured.id)}
              >
                {myList.includes(featured.id) ? (
                  <Check size={19} />
                ) : (
                  <Plus size={19} />
                )}
                Meine Liste
              </button>
            </div>
          </div>
        </section>

        <section className="content">
          <div className="section-heading">
            <div>
              <h2>Weiterschauen</h2>
              <p>Setze deine Videos dort fort, wo du aufgehört hast.</p>
            </div>
            <ChevronRight />
          </div>

          <div className="video-grid">
            {filtered.map((video) => (
              <article className="video-card" key={video.id}>
                <div
                  className="thumbnail"
                  onClick={() => setSelected(video)}
                >
                  <div className="thumbnail-gradient" />
                  <div className="play-circle">
                    <Play size={22} fill="currentColor" />
                  </div>

                  <span className="duration">{video.duration}</span>

                  {video.progress > 0 && (
                    <div className="progress">
                      <div style={{ width: `${video.progress}%` }} />
                    </div>
                  )}
                </div>

                <div className="card-info">
                  <span className="category">{video.category}</span>
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>

                  <div className="card-actions">
                    <button onClick={() => setSelected(video)}>
                      <Play size={16} />
                      Abspielen
                    </button>

                    <button
                      className="list-button"
                      onClick={() => toggleList(video.id)}
                    >
                      {myList.includes(video.id) ? (
                        <Check size={17} />
                      ) : (
                        <Plus size={17} />
                      )}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="architecture">
          <div className="section-heading">
            <div>
              <h2>Plattform-Architektur</h2>
              <p>Vorbereitet für die echte private Streaming-Infrastruktur.</p>
            </div>
          </div>

          <div className="architecture-grid">
            <div>
              <Shield />
              <h3>Google Login</h3>
              <p>Authentifizierung über Google OAuth.</p>
            </div>

            <div>
              <Clock />
              <h3>HLS Streaming</h3>
              <p>Auch mehrere Stunden lange Videos werden segmentiert gestreamt.</p>
            </div>

            <div>
              <Settings />
              <h3>Admin-System</h3>
              <p>Benutzer, Videos, Kategorien und Freigaben zentral verwalten.</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>© 2026 Viedeo</span>
        <button onClick={() => setAdmin(!admin)}>
          {admin ? "Admin-Modus aktiv" : "Admin-Demo"}
        </button>
        <button onClick={() => setApproved(false)}>
          <LogOut size={15} />
          Abmelden
        </button>
      </footer>

      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <div className="player-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setSelected(null)}>
              <X />
            </button>

            <div className="fake-player">
              <Play size={52} fill="currentColor" />
              <span>Geschützter HLS-Player</span>
            </div>

            <div className="player-info">
              <span className="category">{selected.category}</span>
              <h2>{selected.title}</h2>
              <p>{selected.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
