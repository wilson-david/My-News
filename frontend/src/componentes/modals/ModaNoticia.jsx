import '../css/ModalNoticia.css' 

function ModalNoticias({ noticia, isOpen, onClose }) {
  if (!isOpen || !noticia) return null;


    const {
    titulo,
    autor,
    fechaPublicacion,
    descripcion,
    contenido,
    urlImagen,
    url,
  } = noticia;

  
  const fechaFormateada = fechaPublicacion
    ? new Date(fechaPublicacion).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Fecha no disponible";

    return (
        <div className="modal-overlay" onClick={onClose}>
        <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            {/* Botón para cerrar */}
            <button className="modal-cerrar" onClick={onClose}>
            ✖
            </button>

            {/* Imagen (si existe) */}
            {urlImagen && (
            <img
                src={urlImagen}
                alt={titulo}
                className="modal-imagen"
                onError={(e) => {
                e.target.style.display = "none"; // Oculta la imagen si falla la carga
                }}
            />
            )}

            {/* Contenido de la noticia */}
            <div className="modal-info">
            {/* Autor */}
            <span className="modal-autor">
                Por: <strong>{autor || "Autor desconocido"}</strong>
            </span>

            {/* Fecha */}
            <time className="modal-fecha" dateTime={fechaPublicacion}>
                {fechaFormateada}
            </time>

            {/* Título */}
            <h2 className="modal-titulo">{titulo || "Sin título"}</h2>

            {/* Descripción corta */}
            {descripcion && <p className="modal-descripcion">{descripcion}</p>}

            {/* Contenido completo (si existe) */}
            {contenido && (
                <div className="modal-cuerpo">
                <h3>Contenido completo:</h3>
                <div dangerouslySetInnerHTML={{ __html: contenido }} />
                </div>
            )}

            {/* Enlace a la fuente original */}
            {url && (
                <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-enlace"
                >
                🌐 Leer en la fuente original
                </a>
            )}
            </div>
        </div>
        </div>
    );
}


export default ModalNoticias