// ── Importaciones ──────────────────────────────────────────────
import pool from '../config/db.js'

// ── Obtener todos los productos ────────────────────────────────
export const getProducts = async (req, res) => {
    // 1. Consulta todos los productos en la DB
    const result = await pool.query('SELECT * FROM products')

    // 2. Responde 200 OK con la lista de productos
    res.status(200).json({ products: result.rows })
}