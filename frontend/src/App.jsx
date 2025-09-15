// src/App.jsx
import { useState } from 'react';
import './App.css';
import TopHeadlines from './TopHeadlines';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Por ahora, siempre muestra TopHeadlines (después lo condicionas)
  const renderContent = () => {
    return <TopHeadlines />;
  };

  return (
    <div className="app-container">
      {/* Sidebar - Menú lateral (sin cambios) */}
      <aside className="sidebar">
        <div className="logo-section">
          <h1>🗞️ Mi Periódico</h1>
        </div>
        <nav>
          <ul>
            <li>
              <button
                className={activeSection === 'home' ? 'active' : ''}
                onClick={() => setActiveSection('home')}
              >
                🏠 Portada
              </button>
            </li>
            <li>
              <button
                className={activeSection === 'sports' ? 'active' : ''}
                onClick={() => setActiveSection('sports')}
              >
                ⚽ Deportes
              </button>
            </li>
            <li>
              <button
                className={activeSection === 'tech' ? 'active' : ''}
                onClick={() => setActiveSection('tech')}
              >
                💻 Tecnología
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenido principal → Ahora solo renderiza el componente TopHeadlines */}
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;