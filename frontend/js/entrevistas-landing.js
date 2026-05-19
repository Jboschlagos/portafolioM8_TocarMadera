// ── Cargar 3 entrevistas aleatorias para landing ────────────────
async function cargarEntrevistasLanding() {
  const contenedor = document.getElementById("listaEntrevistasLanding");

  try {
    // 1. Consultar endpoint de entrevistas aleatorias
    const res = await fetch(`${API_URL}/api/entrevistas/aleatorias`);
    const data = await res.json();

    // 2. Si no hay entrevistas, mostrar mensaje
    if (data.entrevistas.length === 0) {
      contenedor.innerHTML = `<p style="color: var(--gris-texto); grid-column: 1/-1;">No hay entrevistas disponibles aún.</p>`;
      return;
    }

    // 3. Renderizar las 3 entrevistas
    contenedor.innerHTML = data.entrevistas
      .map(
        (e) => `
            <article class="entrevista-card-landing" onclick="abrirModalEntrevistaLanding(${e.id})" style="cursor: pointer;">
                <!-- Imagen principal -->
                <figure class="entrevista-card-landing__imagen">
                    <img 
                        src="${e.imagen_principal || "img/logoSinFondo.png"}" 
                        alt="${e.artesano}"
                        onerror="this.src='img/logoSinFondo.png'"
                    />
                    <span class="entrevista-card-landing__badge">
                        <i class="bi bi-camera-video"></i> Entrevista
                    </span>
                </figure>

                <!-- Info -->
                <div class="entrevista-card-landing__body">
                    <p class="entrevista-card-landing__oficio">${e.oficio}</p>
                    <h3 class="entrevista-card-landing__nombre">${e.artesano}</h3>
                    <p class="entrevista-card-landing__titulo">${e.titulo}</p>
                    <footer class="entrevista-card-landing__footer">
                        <span><i class="bi bi-geo-alt"></i> ${e.ciudad || "Sin ubicación"}</span>
                        <span><i class="bi bi-calendar3"></i> ${new Date(e.fecha).toLocaleDateString("es-CL")}</span>
                    </footer>
                </div>
            </article>
        `,
      )
      .join("");
  } catch (error) {
    console.error("Error cargando entrevistas:", error);
    contenedor.innerHTML = `<p style="color: var(--gris-texto); grid-column: 1/-1;">Error cargando entrevistas.</p>`;
  }
}

// ── Abrir modal con entrevista completa ────────────────────────
async function abrirModalEntrevistaLanding(id) {
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

// ── Al cargar la página ────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  cargarEntrevistasLanding();
});
