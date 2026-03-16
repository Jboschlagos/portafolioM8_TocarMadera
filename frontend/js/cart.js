// ── Cargar carrito del usuario ─────────────────────────────────
async function cargarCarrito() {
  const contenedor = document.getElementById('listaCarrito')
  const token = localStorage.getItem('token')

  // Si no hay token redirige al login
  if (!token) {
    window.location.href = 'index.html'
    return
  }

  try {
    // 1. Consulta el carrito al backend
    const res = await fetch(`${API_URL}/api/cart`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })

    const data = await res.json()

    // 2. Si el carrito está vacío muestra mensaje
    if (data.cart.length === 0) {
      contenedor.innerHTML = `
        <section class="text-center py-5">
          <i class="bi bi-cart-x" style="font-size: 3rem; color: var(--gris-medio);"></i>
          <p class="mt-3" style="color: var(--gris-texto);">Tu carrito está vacío</p>
          <a href="products.html" class="btn-agregar mt-2 d-inline-block">
            <i class="bi bi-grid"></i> Ver productos
          </a>
        </section>
      `
      return
    }

    // 3. Calcula el total
    const total = data.cart.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
    document.getElementById('subtotal').textContent = `$${total.toLocaleString('es-CL')}`
    document.getElementById('total').textContent = `$${total.toLocaleString('es-CL')}`

    // 4. Renderiza los items del carrito
    contenedor.innerHTML = data.cart.map(item => `
      <article class="card mb-3 shadow-sm" style="border-radius: 10px; border: 1px solid var(--gris-medio);">
        <div class="card-body">
          <div class="row align-items-center g-3">

            <!-- Imagen -->
            <figure class="col-3 col-md-2 m-0">
              <img src="${item.image_url || 'img/logoSinFondo.png'}"
                   alt="${item.name}"
                   style="width: 100%; height: 70px; object-fit: cover; border-radius: 8px;">
            </figure>

            <!-- Nombre y precio -->
            <section class="col-6 col-md-7">
              <h3 style="font-size: 1rem; font-weight: 600; margin: 0;">${item.name}</h3>
              <p class="card-price mb-0">$${Number(item.price).toLocaleString('es-CL')}</p>
              <p style="font-size: 0.8rem; color: var(--gris-texto);">
                Cantidad: ${item.quantity}
              </p>
            </section>

            <!-- Botón eliminar -->
            <section class="col-3 col-md-3 text-end">
              <button onclick="eliminarDelCarrito(${item.product_id || item.id})"
                      class="btn btn-sm"
                      style="background-color: #fee2e2; color: #dc2626; border-radius: 6px; border: none;">
                <i class="bi bi-trash"></i> Eliminar
              </button>
            </section>

          </div>
        </div>
      </article>
    `).join('')

  } catch (error) {
    contenedor.innerHTML = `<p style="color: var(--gris-texto);">Error cargando el carrito.</p>`
  }
}

// ── Eliminar producto del carrito ──────────────────────────────
async function eliminarDelCarrito(productId) {
  const token = localStorage.getItem('token')

  try {
    const res = await fetch(`${API_URL}/api/cart/${productId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })

    if (!res.ok) {
      alert('Error al eliminar el producto')
      return
    }

    // Recarga el carrito después de eliminar
    cargarCarrito()

  } catch (error) {
    alert('Error al eliminar del carrito')
  }
}

// ── Finalizar compra ───────────────────────────────────────────
function finalizarCompra() {
  // En v2 se integra con pasarela de pago
  alert('¡Gracias por tu compra! Pronto nos contactaremos contigo para coordinar el envío.')
}

// ── Al cargar la página ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  cargarCarrito()
})