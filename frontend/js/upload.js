// ── Verificar que el usuario es admin ──────────────────────────
function verificarAdmin() {
    const token = localStorage.getItem('token')

    // Si no hay token redirige al login
    if (!token) {
        window.location.href = 'index.html'
        return
    }

    // Decodifica el token para verificar el rol
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (payload.role !== 'admin') {
        window.location.href = 'landing.html'
    }
}

// ── Cargar lista de productos en el select ─────────────────────
async function cargarProductos() {
    const select = document.getElementById('selectProducto')

    try {
        const res = await fetch('http://localhost:3000/api/products')
        const data = await res.json()

        // Agrega cada producto como opción del select
        data.products.forEach(producto => {
            const option = document.createElement('option')
            option.value = producto.id
            option.textContent = producto.name
            select.appendChild(option)
        })

    } catch (error) {
        console.error('Error cargando productos:', error)
    }
}

// ── Preview de imagen antes de subir ──────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    verificarAdmin()
    cargarProductos()

    // Muestra preview cuando se selecciona un archivo
    document.getElementById('inputImagen').addEventListener('change', (e) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (ev) => {
            document.getElementById('previewImagen').src = ev.target.result
            document.getElementById('previewContainer').style.display = 'block'
        }
        reader.readAsDataURL(file)
    })
})

// ── Subir imagen a Cloudinary y vincularla al producto ─────────
async function subirImagen() {
    const token = localStorage.getItem('token')
    const productId = document.getElementById('selectProducto').value
    const file = document.getElementById('inputImagen').files[0]
    const mensaje = document.getElementById('uploadMessage')

    // 1. Valida que haya archivo y producto seleccionado
    if (!file || !productId) {
        mensaje.innerHTML = `<div class="alert alert-danger">Selecciona un producto y una imagen.</div>`
        return
    }

    try {
        // 2. Sube la imagen a Cloudinary
        const formData = new FormData()
        formData.append('imagen', file)

        mensaje.innerHTML = `<div class="alert alert-info">Subiendo imagen...</div>`

        const resUpload = await fetch('http://localhost:3000/api/upload', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        })

        const dataUpload = await resUpload.json()

        if (!resUpload.ok) {
            mensaje.innerHTML = `<div class="alert alert-danger">${dataUpload.error}</div>`
            return
        }

        // 3. Vincula la imagen al producto en product_images
        const resVincular = await fetch('http://localhost:3000/api/products/images', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                productId,
                imageUrl: dataUpload.url
            })
        })

        if (!resVincular.ok) {
            mensaje.innerHTML = `<div class="alert alert-danger">Error al vincular la imagen.</div>`
            return
        }

        // 4. Responde con éxito
        mensaje.innerHTML = `<div class="alert alert-success">¡Imagen subida y vinculada correctamente!</div>`
        document.getElementById('uploadForm').reset()
        document.getElementById('previewContainer').style.display = 'none'

    } catch (error) {
        mensaje.innerHTML = `<div class="alert alert-danger">Error de conexión con el servidor.</div>`
    }
}