// ── Importaciones ──────────────────────────────────────────────
import { Router } from 'express'
import { uploadImage } from '../controllers/upload.controller.js'
import { verifyToken } from '../middleware/auth.middleware.js'

// ── Router ─────────────────────────────────────────────────────
const router = Router()

// ── Rutas ──────────────────────────────────────────────────────
// POST /api/upload → sube imagen a Cloudinary (protegida con JWT)
router.post('/', verifyToken, uploadImage)

export default router