// ── Importaciones ──────────────────────────────────────────────
import { Router } from 'express'
import { addToCart, getCart, removeFromCart } from '../controllers/cart.controller.js'
import { verifyToken } from '../middleware/auth.middleware.js'

// ── Router ─────────────────────────────────────────────────────
const router = Router()

// ── Rutas ──────────────────────────────────────────────────────
// POST /api/cart → agrega producto al carrito
router.post('/', verifyToken, addToCart)

// GET /api/cart → obtiene el carrito del usuario
router.get('/', verifyToken, getCart)

// DELETE /api/cart/:productId → elimina producto del carrito
router.delete('/:productId', verifyToken, removeFromCart)

export default router