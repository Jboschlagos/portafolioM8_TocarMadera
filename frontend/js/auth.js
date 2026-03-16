// ── Manejo de tabs ─────────────────────────────────────────────
function showTab(tab) {
    // Muestra el formulario correcto y activa el tab correspondiente
    document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none'
    document.getElementById('registerForm').style.display = tab === 'register' ? 'block' : 'none'

    // Activa visualmente el tab seleccionado
    document.getElementById('loginTab').classList.toggle('active', tab === 'login')
    document.getElementById('registerTab').classList.toggle('active', tab === 'register')

    // Limpia el mensaje de resultado
    document.getElementById('authMessage').textContent = ''
}

// ── Login ──────────────────────────────────────────────────────
async function login() {
    // 1. Lee los valores del formulario
    const email = document.getElementById('loginEmail').value
    const password = document.getElementById('loginPassword').value
    const mensaje = document.getElementById('authMessage')

    try {
        // 2. Envía la petición al backend
        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const data = await res.json()

        // 3. Si hubo error, muestra el mensaje
        if (!res.ok) {
            mensaje.innerHTML = `<div class="alert alert-danger">${data.error}</div>`
            return
        }

        // 4. Guarda el token en localStorage y redirige
        localStorage.setItem('token', data.token)
        window.location.href = 'products.html'

    } catch (error) {
        mensaje.innerHTML = `<div class="alert alert-danger">Error de conexión con el servidor</div>`
    }
}

// ── Register ───────────────────────────────────────────────────
async function register() {
    // 1. Lee los valores del formulario
    const username = document.getElementById('regUsername').value
    const email = document.getElementById('regEmail').value
    const password = document.getElementById('regPassword').value
    const mensaje = document.getElementById('authMessage')

    try {
        // 2. Envía la petición al backend
        const res = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        })

        const data = await res.json()

        // 3. Si hubo error, muestra el mensaje
        if (!res.ok) {
            mensaje.innerHTML = `<div class="alert alert-danger">${data.error}</div>`
            return
        }

        // 4. Registro exitoso — cambia al tab de login
        mensaje.innerHTML = `<div class="alert alert-success">¡Registro exitoso! Ya puedes ingresar.</div>`
        showTab('login')

    } catch (error) {
        mensaje.innerHTML = `<div class="alert alert-danger">Error de conexión con el servidor</div>`
    }
}