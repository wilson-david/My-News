// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import Noticias from './componentes/Noticias';
// import ModalNoticia from './componentes/ModalNoticia';
import { useFetch } from './useFetch';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);
  
  // Llamada a la API
  const { data, loading, error } = useFetch('http://localhost:3000/top_headlines');

  // Estado para las noticias formateadas
  const [noticiasFormateadas, setNoticiasFormateadas] = useState([]);

  // Efecto para formatear los datos cuando llegan
  useEffect(() => {
    if (data && data.articles) {
      console.log(data.articles);
      const noticias = data.articles.map(article => ({
        ...article,
        id: article.url, 
        urlImagen: article.urlToImage, 
        autor: article.author || "Autor desconocido",
        fechaPublicacion: article.publishedAt,
        contenido: article.content || article.description
      }));
      setNoticiasFormateadas(noticias);
    }
  }, [data]);

  const abrirModal = (noticia) => {
    setNoticiaSeleccionada(noticia);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setNoticiaSeleccionada(null);
  };

  const renderContent = () => {
    // Manejo de estados de carga y error
    if (loading) {
      return <div className="loading">Cargando noticias...</div>;
    }

    if (error) {
      return <div className="error">Error al cargar las noticias: {error.message}</div>;
    }

    return (
      <>
        <h2>📰 {activeSection === 'home' ? 'Portada' : activeSection === 'sports' ? 'Deportes' : 'Tecnología'}</h2>
        <div className="noticias-container">
          {noticiasFormateadas.length > 0 ? (
            noticiasFormateadas.map(noticia => (
              <Noticias
                key={noticia.id}
                {...noticia}
                onOpen={() => abrirModal(noticia)}
              />
            ))
          ) : (
            <div>No hay noticias disponibles</div>
          )}
        </div>
        {/* <ModalNoticia
          isOpen={modalAbierto}
          noticia={noticiaSeleccionada}
          onClose={cerrarModal}
        /> */}
      </>
    );
  };

  return (
    <div className="app-container">
      {/* Sidebar - Menú lateral */}
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

      {/* Contenido principal */}
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;