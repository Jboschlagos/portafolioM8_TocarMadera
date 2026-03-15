// ── Carga componentes navbar y footer en cada página ───────────
async function cargarComponentes() {
    // Carga el navbar
    const navbar = await fetch('components/navbar.html')
    document.getElementById('navbar-container').innerHTML = await navbar.text()

    // Carga el footer
    const footer = await fetch('components/footer.html')
    document.getElementById('footer-container').innerHTML = await footer.text()

    // Actualiza el navbar según si hay token
    actualizarNavbar()
}

// ── Navbar dinámico ────────────────────────────────────────────
function actualizarNavbar() {
    const token = localStorage.getItem('token')
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
document.addEventListener('DOMContentLoaded', cargarComponentes)