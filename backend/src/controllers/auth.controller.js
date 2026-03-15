// ── Importaciones ──────────────────────────────────────────────
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../config/db.js'


// ── Registro de usuario ────────────────────────────────────────
export const register = async (req, res) => {
    // 1. Recibe los datos del body
    const { username, email, password } = req.body

    // 2. Valida que no falte ninguno
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' })
    }

    // 3. Hashea la contraseña con bcrypt
    const password_hash = await bcrypt.hash(password, 10)

    // 4. Guarda el usuario en la DB
    const result = await pool.query(
        'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
        [username, email, password_hash]
    )

    // 5. Responde 201 Created con el usuario creado
    res.status(201).json({ user: result.rows[0] })
}

// ── Login de usuario ───────────────────────────────────────────
export const login = async (req, res) => {
    // 1. Recibe los datos del body
    const { email, password } = req.body

    // 2. Valida que no falten datos
    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son obligatorios' })
    }

    // 3. Busca el usuario en la DB por email
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    )

    // 4. Si no existe el usuario, responde 401
    if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    const user = result.rows[0]

    // 5. Compara la contraseña con el hash guardado
    const validPassword = await bcrypt.compare(password, user.password_hash)

    // 6. Si la contraseña no coincide, responde 401
    if (!validPassword) {
        return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    // 7. Genera el token JWT con el user_id en el payload
    const token = jwt.sign(
        { user_id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    )

    // 8. Responde 200 OK con el token
    res.status(200).json({ token })
}