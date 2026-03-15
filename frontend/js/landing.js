// ── Navbar dinámico ────────────────────────────────────────────
function actualizarNavbar() {
    const token = localStorage.getItem('token')

    // Si hay token — muestra carrito y logout, oculta login
    if (token) {
        document.getElementById('cartLink').style.display = 'block'
        document.getElementById('logoutLink').style.display = 'block'
        document.getElementById('loginLink').style.display = 'none'
    }
}

// ── Logout ─────────────────────────────────────────────────────
function logout() {
    localStorage.removeItem('token')
    window.location.href = 'index.html'
}

// ── Al cargar la página ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    actualizarNavbar()
    cargarUltimosProductos()
})

// ── Cargar últimos productos ───────────────────────────────────
async function cargarUltimosProductos() {
    const contenedor = document.getElementById('ultimosProductos')

    try {
        // 1. Consulta los productos al backend
        const res = await fetch('http://localhost:3000/api/products')
        const data = await res.json()

        // 2. Toma solo los últimos 4 productos
        const ultimos = data.products.slice(-4).reverse()

        // 3. Si no hay productos muestra mensaje
        if (ultimos.length === 0) {
            contenedor.innerHTML = `<p style="color: var(--gris-texto);">No hay productos aún.</p>`
            return
        }

        // 4. Renderiza las tarjetas
        contenedor.innerHTML = ultimos.map(producto => `
        <div class="col-12 col-sm-6 col-lg-3">
        <article class="product-card">
            <img src="${producto.image_url || 'img/logoSinFondo.png'}" 
            alt="${producto.name}">
            <div class="card-body">
            <h3 class="card-title">${producto.name}</h3>
            <p class="card-price">$${Number(producto.price).toLocaleString('es-CL')}</p>
            <p class="card-location">
                <i class="bi bi-geo-alt"></i> 
                ${producto.ciudad || ''}, ${producto.region || ''}
            </p>
            <a href="products.html" class="btn-agregar">Ver productos</a>
            </div>
        </article>
        </div>
    `).join('')

    } catch (error) {
        contenedor.innerHTML = `<p style="color: var(--gris-texto);">Error cargando productos.</p>`
    }
}