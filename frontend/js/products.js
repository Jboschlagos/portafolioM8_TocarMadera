// ── Variables globales ─────────────────────────────────────────
let mapa = null
let productoActual = null

// ── Inicializar mapa centrado en Chile ─────────────────────────
function inicializarMapa() {
    mapa = L.map('mapa').setView([-35.6751, -71.5430], 5)

    // Capa minimalista CartoDB — menos detalles, más elegante
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CartoDB'
    }).addTo(mapa)
}

// ── Encuadrar Chile ────────────────────────────────────────────
function encuadrarChile() {
    mapa.setView([-35.6751, -71.5430], 5)
}

// ── Cargar productos ───────────────────────────────────────────
async function cargarProductos() {
    const contenedor = document.getElementById('listaProductos')

    try {
        // 1. Consulta los productos al backend
        const res = await fetch(`${API_URL}/api/products`)
        const data = await res.json()

        // 2. Si no hay productos muestra mensaje
        if (data.products.length === 0) {
            contenedor.innerHTML = `<p style="color: var(--gris-texto);">No hay productos aún.</p>`
            return
        }

        // 3. Renderiza las tarjetas
        contenedor.innerHTML = data.products.map(producto => `
      <div class="col-12 col-sm-6">
        <article class="product-card" onclick='abrirModal(${JSON.stringify(producto)})'
                 style="cursor: pointer;">
          <img src="${producto.imagenes && producto.imagenes.length > 0
                ? producto.imagenes[0].url
                : 'img/logoSinFondo.png'}"
               alt="${producto.name}"
               style="height:150px; object-fit:cover; width:100%;">
          <div class="card-body">
            <h3 class="card-title">${producto.name}</h3>
            <p class="card-price">$${Number(producto.price).toLocaleString('es-CL')}</p>
            <p class="card-location">
              <i class="bi bi-geo-alt"></i>
              ${producto.ciudad || ''}, ${producto.region || ''}
            </p>
          </div>
        </article>
      </div>
    `).join('')

        // 4. Agrega un pin en el mapa por cada producto con coordenadas
        data.products.forEach(producto => {
            if (producto.lat && producto.lng) {
                L.marker([producto.lat, producto.lng])
                    .addTo(mapa)
                    .bindPopup(`
            <strong>${producto.name}</strong><br>
            $${Number(producto.price).toLocaleString('es-CL')}<br>
            ${producto.ciudad}, ${producto.region}
          `)
            }
        })

    } catch (error) {
        contenedor.innerHTML = `<p style="color: var(--gris-texto);">Error cargando productos.</p>`
    }
}

// ── Abrir modal con detalle del producto ───────────────────────
function abrirModal(producto) {
    productoActual = producto

    // 1. Llena los datos del modal
    document.getElementById('modalNombre').textContent = producto.name
    document.getElementById('modalPrecio').textContent = `$${Number(producto.price).toLocaleString('es-CL')}`
    document.getElementById('modalUbicacion').innerHTML = `<i class="bi bi-geo-alt"></i> ${producto.ciudad || ''}, ${producto.region || ''}`
    document.getElementById('modalDescripcion').textContent = producto.description || 'Sin descripción'

    // 2. Construye el carrusel de imágenes
    const slides = document.getElementById('modalCarruselSlides')
    if (producto.imagenes && producto.imagenes.length > 0) {
        slides.innerHTML = producto.imagenes.map((img, i) => `
      <div class="carousel-item ${i === 0 ? 'active' : ''}">
        <img src="${img.url}" alt="${producto.name}"
             style="height: 300px; object-fit: cover; width: 100%; border-radius: 8px;">
      </div>
    `).join('')
    } else {
        slides.innerHTML = `
      <div class="carousel-item active">
        <img src="img/logoSinFondo.png" alt="${producto.name}"
             style="height: 300px; object-fit: cover; width: 100%; border-radius: 8px;">
      </div>
    `
    }

    // 3. Abre el modal
    const modal = new bootstrap.Modal(document.getElementById('modalProducto'))
    modal.show()
}

// ── Agregar al carrito desde el modal ─────────────────────────
async function agregarAlCarrito() {
    const token = localStorage.getItem('token')

    // Si no hay token redirige al login
    if (!token) {
        window.location.href = 'index.html'
        return
    }

    try {
        const res = await fetch(`${API_URL}/api/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ productId: productoActual.id, quantity: 1 })
        })

        const data = await res.json()

        if (!res.ok) {
            alert(data.error)
            return
        }

        // Cierra el modal y redirige al carrito
        bootstrap.Modal.getInstance(document.getElementById('modalProducto')).hide()
        window.location.href = 'cart.html'

    } catch (error) {
        alert('Error al agregar al carrito')
    }
}

// ── Compartir producto ─────────────────────────────────────────
function compartirProducto() {
    const url = encodeURIComponent(window.location.href)
    const texto = encodeURIComponent(`¡Mira este producto en Tocar Madera: ${productoActual.name}!`)

    const opciones = `
    <div style="display:flex; gap:1rem; justify-content:center; padding:1rem;">
      <a href="https://www.facebook.com/sharer/sharer.php?u=${url}"
         target="_blank" style="color: #1877F2; font-size: 2rem;">
        <i class="bi bi-facebook"></i>
      </a>
      <a href="https://wa.me/?text=${texto}%20${url}"
         target="_blank" style="color: #25D366; font-size: 2rem;">
        <i class="bi bi-whatsapp"></i>
      </a>
      <a href="https://www.instagram.com/"
         target="_blank" style="color: #E1306C; font-size: 2rem;">
        <i class="bi bi-instagram"></i>
      </a>
    </div>
  `
    const div = document.createElement('div')
    div.innerHTML = opciones
    div.style.cssText = 'position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:white; border-radius:12px; padding:1rem; box-shadow:0 8px 30px rgba(0,0,0,0.15); z-index:9999;'
    div.onclick = () => div.remove()
    document.body.appendChild(div)
}

// ── Al cargar la página ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    inicializarMapa()
    cargarProductos()
})