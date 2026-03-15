// ── Importaciones ──────────────────────────────────────────────
import { Router } from 'express'
import { getProducts } from '../controllers/products.controller.js'
import { verifyToken } from '../middleware/auth.middleware.js'

// ── Router ─────────────────────────────────────────────────────
const router = Router()

// ── Rutas ──────────────────────────────────────────────────────
// GET /api/products → lista de productos (protegida con JWT)
router.get('/', verifyToken, getProducts)

export default router