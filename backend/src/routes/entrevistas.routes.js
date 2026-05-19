// ── Importaciones ──────────────────────────────────────────────
import { Router } from "express";
import {
  getEntrevistas,
  getEntrevistasAleatorias,
  getEntrevistaById,
  createEntrevista,
  updateEntrevista,
  deleteEntrevista,
} from "../controllers/entrevistas.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";

// ── Router ─────────────────────────────────────────────────────
const router = Router();

// ── Rutas públicas ─────────────────────────────────────────────
// GET /api/entrevistas → obtener todas con filtros
router.get("/", getEntrevistas);

// GET /api/entrevistas/aleatorias → obtener 3 aleatorias (para landing)
router.get("/aleatorias", getEntrevistasAleatorias);

// GET /api/entrevistas/:id → obtener una por ID
router.get("/:id", getEntrevistaById);

// ── Rutas protegidas (solo admin) ──────────────────────────────
// POST /api/entrevistas → crear entrevista
router.post("/", verifyToken, isAdmin, createEntrevista);

// PUT /api/entrevistas/:id → actualizar entrevista
router.put("/:id", verifyToken, isAdmin, updateEntrevista);

// DELETE /api/entrevistas/:id → eliminar entrevista
router.delete("/:id", verifyToken, isAdmin, deleteEntrevista);

export default router;
