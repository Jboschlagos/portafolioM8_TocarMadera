// ── Variables globales ─────────────────────────────────────────
let entrevistasActuales = [];
let paginaActual = 1;
const ENTREVISTAS_POR_PAGINA = 6;

// ── Cargar entrevistas con filtros ─────────────────────────────
async function cargarEntrevistas(pagina = 1) {
  const oficio = document.getElementById("filtroOficio").value;
  const ciudad = document.getElementById("filtroCiudad").value;
  const fecha = document.getElementById("filtroFecha").value;

  try {
    // 1. Construir query con filtros
    let url = `${API_URL}/api/entrevistas?limite=${ENTREVISTAS_POR_PAGINA}&offset=${(pagina - 1) * ENTREVISTAS_POR_PAGINA}`;

    if (oficio) url += `&oficio=${encodeURIComponent(oficio)}`;
    if (ciudad) url += `&ciudad=${encodeURIComponent(ciudad)}`;
    if (fecha) {
      url += `&fecha_inicio=${fecha}-01-01&fecha_fin=${fecha}-12-31`;
    }

    // 2. Obtener datos
    const res = await fetch(url);
    const data = await res.json();

    entrevistasActuales = data;

    // 3. Renderizar
    renderEntrevistas(data.entrevistas);
    renderPaginacion(data.total, pagina);
    paginaActual = pagina;
  } catch (error) {
    console.error("Error cargando entrevistas:", error);
    document.getElementById("listaEntrevistas").innerHTML =
      `<p style="color: var(--gris-texto); grid-column: 1/-1;">Error cargando entrevistas.</p>`;
  }
}

// ── Renderizar cards de entrevistas ────────────────────────────
function renderEntrevistas(entrevistas) {
  const contenedor = document.getElementById("listaEntrevistas");

  if (entrevistas.length === 0) {
    contenedor.innerHTML = `<p style="color: var(--gris-texto); grid-column: 1/-1;">No se encontraron entrevistas con esos filtros.</p>`;
    return;
  }

  contenedor.innerHTML = entrevistas
    .map(
      (e) => `
        <article class="entrevista-card" onclick="abrirModalEntrevista(${e.id})" style="cursor: pointer;">
            <!-- Imagen principal -->
            <figure class="entrevista-card__imagen">
                <img 
                    src="${e.imagen_principal || "img/logoSinFondo.png"}" 
                    alt="${e.artesano}"
                    onerror="this.src='img/logoSinFondo.png'"
                />
                <span class="entrevista-card__badge">
                    <i class="bi bi-camera-video"></i> Entrevista
                </span>
            </figure>

            <!-- Info -->
            <div class="entrevista-card__body">
                <p class="entrevista-card__oficio">${e.oficio}</p>
                <h3 class="entrevista-card__nombre">${e.artesano}</h3>
                <p class="entrevista-card__titulo">${e.titulo}</p>
                <footer class="entrevista-card__footer">
                    <span><i class="bi bi-geo-alt"></i> ${e.ciudad || "Sin ubicación"}</span>
                    <span><i class="bi bi-calendar3"></i> ${new Date(e.fecha).toLocaleDateString("es-CL")}</span>
                </footer>
            </div>
        </article>
    `,
    )
    .join("");
}

// ── Renderizar paginación ──────────────────────────────────────
function renderPaginacion(total, paginaActual) {
  const totalPaginas = Math.ceil(total / ENTREVISTAS_POR_PAGINA);
  const contenedor = document.getElementById("paginacion");

  if (totalPaginas <= 1) {
    contenedor.innerHTML = "";
    return;
  }

  let html = "";

  // Botón anterior
  if (paginaActual > 1) {
    html += `<li class="page-item">
            <a class="page-link" href="#" onclick="cargarEntrevistas(${paginaActual - 1}); return false">
                <i class="bi bi-chevron-left"></i>
            </a>
        </li>`;
  }

  // Números de página
  for (let i = 1; i <= totalPaginas; i++) {
    if (i === paginaActual) {
      html += `<li class="page-item active"><span class="page-link">${i}</span></li>`;
    } else {
      html += `<li class="page-item">
                <a class="page-link" href="#" onclick="cargarEntrevistas(${i}); return false">${i}</a>
            </li>`;
    }
  }

  // Botón siguiente
  if (paginaActual < totalPaginas) {
    html += `<li class="page-item">
            <a class="page-link" href="#" onclick="cargarEntrevistas(${paginaActual + 1}); return false">
                <i class="bi bi-chevron-right"></i>
            </a>
        </li>`;
  }

  contenedor.innerHTML = html;
}

// ── Abrir modal con entrevista completa ────────────────────────
async function abrirModalEntrevista(id) {
  try {
    const res = await fetch(`${API_URL}/api/entrevistas/${id}`);
    const data = await res.json();
    const e = data.entrevista;

    // Crear modal
    const modalId = `modal-entrevista-${id}`;
    const existente = document.getElementById(modalId);
    if (existente) existente.remove();

    const modal = document.createElement("div");
    modal.id = modalId;
    modal.className = "modal fade";
    modal.tabIndex = -1;
    modal.innerHTML = `
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <article class="modal-content" style="border-radius: 12px;">

                    <header class="modal-header" style="border-bottom: 2px solid var(--madera);">
                        <h4 class="modal-title">${e.artesano}</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </header>

                    <section class="modal-body">
                        <div class="row g-3">

                            <!-- Video de YouTube embebido -->
                            <div class="col-12">
                                <div class="embed-youtube">
                                    <iframe 
                                        width="100%" 
                                        height="400"
                                        src="https://www.youtube.com/embed/${e.youtube_id}" 
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen
                                    ></iframe>
                                </div>
                            </div>

                            <!-- Info -->
                            <div class="col-12">
                                <p style="font-size: 0.9rem; color: var(--gris-texto);">
                                    <i class="bi bi-geo-alt"></i> ${e.ciudad || ""}, ${e.region || ""}
                                </p>
                                <p style="font-weight: 600; color: var(--madera);">${e.oficio}</p>
                                <h5 style="margin: 0.5rem 0;">Sobre la entrevista</h5>
                                <p style="color: var(--gris-texto); font-size: 0.95rem; line-height: 1.6;">${e.descripcion || "Sin descripción"}</p>
                                
                                ${
                                  e.tecnica
                                    ? `
                                    <h5 style="margin: 1rem 0 0.5rem;">Técnica</h5>
                                    <p style="color: var(--gris-texto); font-size: 0.95rem; line-height: 1.6;">${e.tecnica}</p>
                                `
                                    : ""
                                }
                            </div>

                            <!-- Link a YouTube -->
                            <div class="col-12 text-center">
                                <a href="https://www.youtube.com/watch?v=${e.youtube_id}" target="_blank" class="btn" style="background-color: #FF0000; color: white;">
                                    <i class="bi bi-youtube"></i> Ver en YouTube
                                </a>
                            </div>

                        </div>
                    </section>

                </article>
            </div>
        `;

    document.body.appendChild(modal);
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();

    // Eliminar modal del DOM cuando se cierre
    modal.addEventListener("hidden.bs.modal", () => modal.remove());
  } catch (error) {
    console.error("Error abriendo entrevista:", error);
    alert("Error al cargar la entrevista");
  }
}

// ── Event listeners ────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  cargarEntrevistas(1);

  document.getElementById("btnFiltrar").addEventListener("click", () => {
    cargarEntrevistas(1);
  });

  document.getElementById("btnLimpiar").addEventListener("click", () => {
    document.getElementById("filtroOficio").value = "";
    document.getElementById("filtroCiudad").value = "";
    document.getElementById("filtroFecha").value = "";
    cargarEntrevistas(1);
  });

  // Permitir Enter en los inputs para filtrar
  document.querySelectorAll('[id^="filtro"]').forEach((input) => {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") cargarEntrevistas(1);
    });
  });
});
