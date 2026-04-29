/**
 * historias.js — Cards + Modal de entrevistas a artesanos
 * Tocar Madera | Mercado En Línea Colaborativo
 *
 * Depende de: historias-data.js (debe cargarse antes)
 * Usa: Bootstrap 5 (ya incluido en landing.html)
 */

// ── Renderizar cards en el contenedor ─────────────────────────
function renderHistorias() {
  const contenedor = document.getElementById("listaHistorias");
  if (!contenedor) return;

  const historias = window.HISTORIAS_DATA || [];

  if (historias.length === 0) {
    contenedor.innerHTML = `<p style="color: var(--gris-texto);">No hay historias aún.</p>`;
    return;
  }

  contenedor.innerHTML = historias
    .map(
      (h) => `
    <article
      class="historia-card"
      onclick="abrirHistoria(${h.id})"
      role="button"
      tabindex="0"
      aria-label="Ver entrevista: ${h.artesano}"
      onkeydown="if(event.key==='Enter'||event.key===' ')abrirHistoria(${h.id})"
    >
      <!-- Imagen de portada -->
      <figure class="historia-card__imagen">
        <img
          src="${h.imagen_portada}"
          alt="${h.artesano} — ${h.oficio}"
          loading="lazy"
          onerror="this.src='img/logoSinFondo.png'"
        />
        <span class="historia-card__tipo">
          <i class="bi bi-camera-video"></i> ${h.tipo}
        </span>
      </figure>

      <!-- Cuerpo -->
      <div class="historia-card__body">
        <p class="historia-card__oficio">${h.oficio}</p>
        <h3 class="historia-card__nombre">${h.artesano}</h3>
        <p class="historia-card__frase">"${h.frase_card}"</p>
        <footer class="historia-card__footer">
          <span><i class="bi bi-geo-alt"></i> ${h.ciudad}, ${h.region}</span>
          <span><i class="bi bi-calendar3"></i> ${h.fecha}</span>
        </footer>
      </div>
    </article>
  `,
    )
    .join("");
}

// ── Abrir modal con la historia completa ──────────────────────
function abrirHistoria(id) {
  const h = (window.HISTORIAS_DATA || []).find((x) => x.id === id);
  if (!h) return;

  // Eliminar modal previo si existe
  const existing = document.getElementById("historia-modal-overlay");
  if (existing) existing.remove();

  // Construir slides del carrusel
  const slides = h.imagenes
    .map(
      (img, i) => `
    <div class="historia-slide ${i === 0 ? "historia-slide--active" : ""}" data-index="${i}">
      <img src="${img.url}" alt="${img.caption}" loading="lazy" onerror="this.src='img/logoSinFondo.png'" />
      <figcaption class="historia-slide__caption">${img.caption}</figcaption>
    </div>
  `,
    )
    .join("");

  const dots = h.imagenes
    .map(
      (_, i) => `
    <button
      class="historia-dot ${i === 0 ? "historia-dot--active" : ""}"
      data-slide="${i}"
      aria-label="Imagen ${i + 1}"
    ></button>
  `,
    )
    .join("");

  // Construir párrafos de intro
  const introHTML = h.intro.map((p) => `<p>${p}</p>`).join("");

  // Construir bloques temáticos
  const bloquesHTML = h.bloques
    .map(
      (b, i) => `
    <details class="historia-bloque" ${i === 0 ? "open" : ""}>
      <summary class="historia-bloque__titulo">
        <i class="bi ${b.icono}"></i>
        ${b.titulo}
        <i class="bi bi-chevron-down historia-bloque__chevron"></i>
      </summary>
      <div class="historia-bloque__contenido">
        <p>${b.contenido}</p>
      </div>
    </details>
  `,
    )
    .join("");

  // Construir ficha de datos
  const fichaHTML = h.ficha
    .map(
      (f) => `
    <div class="historia-ficha__item">
      <span class="historia-ficha__label">${f.label}</span>
      <span class="historia-ficha__valor">${f.valor}</span>
    </div>
  `,
    )
    .join("");

  // Construir modal completo
  const overlay = document.createElement("div");
  overlay.id = "historia-modal-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", `Entrevista: ${h.artesano}`);

  overlay.innerHTML = `
    <div class="historia-modal">

      <!-- Botón cerrar -->
      <button class="historia-modal__cerrar" id="historia-cerrar" aria-label="Cerrar entrevista">
        <i class="bi bi-x-lg"></i>
      </button>

      <!-- Cabecera: fotos + nombre -->
      <header class="historia-modal__cabecera">
        <div class="historia-modal__fotos">
          <img
            class="historia-modal__foto historia-modal__foto--principal"
            src="${h.imagen_cabecera}"
            alt="${h.artesano}"
            onerror="this.src='img/logoSinFondo.png'"
          />
          <img
            class="historia-modal__foto historia-modal__foto--secundaria"
            src="${h.imagen_cabecera_alt}"
            alt="Taller de ${h.artesano}"
            onerror="this.src='img/logoSinFondo.png'"
          />
        </div>
        <div class="historia-modal__meta">
          <span class="historia-modal__tipo">
            <i class="bi bi-camera-video"></i> ${h.tipo} · ${h.fecha}
          </span>
          <h2 class="historia-modal__nombre">${h.artesano}</h2>
          <p class="historia-modal__oficio">${h.oficio}</p>
          <p class="historia-modal__ubicacion">
            <i class="bi bi-geo-alt"></i> ${h.ciudad}, ${h.region}
          </p>
          <blockquote class="historia-modal__frase">"${h.frase_card}"</blockquote>
        </div>
      </header>

      <!-- Cuerpo del modal -->
      <div class="historia-modal__cuerpo">

        <!-- Columna izquierda: intro + bloques -->
        <section class="historia-modal__izquierda">
          <div class="historia-modal__intro">
            ${introHTML}
          </div>

          <h4 class="historia-modal__subtitulo">
            <i class="bi bi-journal-text"></i> En profundidad
          </h4>
          <div class="historia-modal__bloques">
            ${bloquesHTML}
          </div>
        </section>

        <!-- Columna derecha: carrusel + ficha -->
        <aside class="historia-modal__derecha">

          <!-- Carrusel -->
          <div class="historia-carrusel" id="historia-carrusel">
            <div class="historia-carrusel__track" id="historia-track">
              ${slides}
            </div>
            <button class="historia-carrusel__btn historia-carrusel__btn--prev" id="historia-prev" aria-label="Anterior">
              <i class="bi bi-chevron-left"></i>
            </button>
            <button class="historia-carrusel__btn historia-carrusel__btn--next" id="historia-next" aria-label="Siguiente">
              <i class="bi bi-chevron-right"></i>
            </button>
            <div class="historia-carrusel__dots" id="historia-dots">
              ${dots}
            </div>
          </div>

          <!-- Ficha de datos -->
          <div class="historia-ficha">
            <h4 class="historia-modal__subtitulo">
              <i class="bi bi-card-list"></i> Ficha
            </h4>
            <div class="historia-ficha__grid">
              ${fichaHTML}
            </div>
          </div>

        </aside>
      </div>

    </div>
  `;

  document.body.appendChild(overlay);

  // Trigger animación de entrada
  requestAnimationFrame(() =>
    overlay.classList.add("historia-modal-overlay--visible"),
  );

  // ── Inicializar carrusel ───────────────────────────────────
  let slideActual = 0;
  const totalSlides = h.imagenes.length;

  function irASlide(i) {
    // Ocultar slide actual
    const slides = overlay.querySelectorAll(".historia-slide");
    const dotsEl = overlay.querySelectorAll(".historia-dot");

    slides[slideActual].classList.remove("historia-slide--active");
    dotsEl[slideActual].classList.remove("historia-dot--active");

    slideActual = (i + totalSlides) % totalSlides;

    slides[slideActual].classList.add("historia-slide--active");
    dotsEl[slideActual].classList.add("historia-dot--active");
  }

  overlay
    .querySelector("#historia-prev")
    .addEventListener("click", () => irASlide(slideActual - 1));
  overlay
    .querySelector("#historia-next")
    .addEventListener("click", () => irASlide(slideActual + 1));

  overlay.querySelectorAll(".historia-dot").forEach((dot) => {
    dot.addEventListener("click", () => irASlide(parseInt(dot.dataset.slide)));
  });

  // Swipe táctil
  let touchStartX = 0;
  const track = overlay.querySelector("#historia-track");
  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true },
  );
  track.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) irASlide(slideActual + (diff > 0 ? 1 : -1));
  });

  // ── Cerrar modal ──────────────────────────────────────────
  function cerrarHistoria() {
    overlay.classList.remove("historia-modal-overlay--visible");
    setTimeout(() => overlay.remove(), 300);
  }

  overlay
    .querySelector("#historia-cerrar")
    .addEventListener("click", cerrarHistoria);

  // Click fuera del modal
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) cerrarHistoria();
  });

  // Tecla Escape
  document.addEventListener("keydown", function onEsc(e) {
    if (e.key === "Escape") {
      cerrarHistoria();
      document.removeEventListener("keydown", onEsc);
    }
  });
}

// ── Al cargar la página ────────────────────────────────────────
document.addEventListener("DOMContentLoaded", renderHistorias);
