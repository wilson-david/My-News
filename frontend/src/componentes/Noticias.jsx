// src/componentes/Noticias.jsx
import React from 'react';
import './css/Noticia.css';

function Noticias({ titulo , urlImagen, autor, fechaPublicacion, onOpen }) {
  const fechaFormateada = new Date(fechaPublicacion).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article className="noticia-card" onClick={onOpen}>
      {urlImagen && (
        <div className="noticia-imagen-container">
          <img
            src={urlImagen}
            alt={titulo}
            className="noticia-imagen"
            loading="lazy"
          />
        </div>
      )}

      <div className="noticia-contenido">
        <span className="noticia-autor">Por: {autor}</span>
        <time className="noticia-fecha">{fechaFormateada}</time>
        <h3 className="noticia-titulo">{titulo}</h3>
        <button className="btn-leer-mas">📖 Leer noticia completa</button>
      </div>
    </article>
  );
}

export default Noticias;