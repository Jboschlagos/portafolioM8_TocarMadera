// ── Importaciones ──────────────────────────────────────────────
import { Router } from 'express'
import { register, login } from '../controllers/auth.controller.js'

// ── Router ─────────────────────────────────────────────────────
const router = Router()

// ── Rutas ──────────────────────────────────────────────────────
// POST /api/auth/register → crea un nuevo usuario
router.post('/register', register)

// POST /api/auth/login → autentica y devuelve token
router.post('/login', login)

export default router