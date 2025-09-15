// src/componentes/TopHeadlines.jsx
import { useState, useEffect } from 'react';
import Noticias from './componentes/Noticias';
import ModalNoticia from './componentes/modals/ModaNoticia';
import { useFetch } from './useFetch';
import { paises } from './datos/paises';


function TopHeadlines() {
  const [noticias, setNoticias] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);
  
  // Estados para los selects
  const [pais, setPais] = useState('us');

    let url = `http://localhost:3000/top_headlines?country=${pais}`;

  const { data } = useFetch(url);

  useEffect(() => {
    if (data?.articles) {
      const noticiasFormateadas = data.articles.map(article => ({
        ...article,
        urlImagen: article.urlToImage,
        autor: article.author || "Autor desconocido",
        fechaPublicacion: article.publishedAt,
        contenido: article.content || article.description
      }));
      setNoticias(noticiasFormateadas);
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

  return (
    <>
      <h2>📰 Portada</h2>
      <div className="filtros-fila">
        <div className="filtro-item">
          <label htmlFor="pais">País:</label>
          <select
            id="pais"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
          >
            {paises.map((pais) => (
              <option key={pais.codigo} value={pais.codigo}>
                {pais.nombre}
              </option>
            ))}
            <option value="us">Estados Unidos</option>
            <option value="co">Colombia</option>
            <option value="es">España</option>
            <option value="fr">Francia</option>
            <option value="gb">Reino Unido</option>
          </select>
        </div>

      </div>

        <div className="noticias-container">
        {noticias.length > 0 ? (
          noticias.map((noticia) => (
            <Noticias
              key={noticia.url}
              {...noticia}
              onOpen={() => abrirModal(noticia)}
            />
          ))
        ) : (
          <p>No hay noticias disponibles</p>
        )}
      </div>


      <ModalNoticia
        isOpen={modalAbierto}
        noticia={noticiaSeleccionada}
        onClose={cerrarModal}
      />
    </>
  );
}

export default TopHeadlines;