// ── Importaciones ──────────────────────────────────────────────
import jwt from 'jsonwebtoken'

// ── Middleware de autenticación JWT ────────────────────────────
export const verifyToken = (req, res, next) => {
    // 1. Lee el header Authorization de la petición
    const authHeader = req.headers['authorization']

    // 2. Si no hay header, responde 401
    if (!authHeader) {
        return res.status(401).json({ error: 'Token requerido' })
    }

    // 3. Extrae el token del header (viene como "Bearer <token>")
    const token = authHeader.split(' ')[1]

    // 4. Verifica que el token sea válido
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        // 5. Si el token es inválido o expiró, responde 401
        if (err) {
            return res.status(401).json({ error: 'Token inválido o expirado' })
        }

        // 6. Si es válido, adjunta el user_id al request y continúa
        req.userId = decoded.user_id
        req.userRole = decoded.role
        next()
    })

}
// ── Middleware de verificación de rol admin ────────────────────
export const isAdmin = (req, res, next) => {
    // Verifica que el usuario autenticado tenga rol admin
    if (req.userRole !== 'admin') {
        return res.status(403).json({ error: 'Acceso denegado — se requiere rol admin' })
    }
    next()
}