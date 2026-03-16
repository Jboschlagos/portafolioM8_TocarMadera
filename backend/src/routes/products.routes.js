// ── Importaciones ──────────────────────────────────────────────
import { Router } from 'express'
import { getProducts, createProduct, addProductImage } from '../controllers/products.controller.js'
import { verifyToken, isAdmin } from '../middleware/auth.middleware.js'

// ── Router ─────────────────────────────────────────────────────
const router = Router()

// ── Rutas ──────────────────────────────────────────────────────
// GET /api/products → lista de productos (público)
router.get('/', getProducts)

// POST /api/products → crea producto (solo admin)
router.post('/', verifyToken, isAdmin, createProduct)

// POST /api/products/images → vincula imagen a producto (solo admin)
router.post('/images', verifyToken, isAdmin, addProductImage)

export default router