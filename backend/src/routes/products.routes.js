// ── Importaciones ──────────────────────────────────────────────
import { Router } from 'express'
import { getProducts, createProduct } from '../controllers/products.controller.js'
import { verifyToken } from '../middleware/auth.middleware.js'
import { isAdmin } from '../middleware/auth.middleware.js'

// ── Router ─────────────────────────────────────────────────────
const router = Router()

// ── Rutas ──────────────────────────────────────────────────────
router.get('/', getProducts)

// POST /api/products → crea producto (solo admin)
router.post('/', verifyToken, isAdmin, createProduct)

export default router