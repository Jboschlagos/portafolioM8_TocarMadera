// ── Importaciones ──────────────────────────────────────────────
import pool from '../config/db.js'

// ── Obtener todos los productos ────────────────────────────────
export const getProducts = async (req, res) => {
    // 1. Consulta todos los productos en la DB
    const result = await pool.query('SELECT * FROM products')

    // 2. Responde 200 OK con la lista de productos
    res.status(200).json({ products: result.rows })
}
// ── Crear producto (solo admin) ────────────────────────────────
export const createProduct = async (req, res) => {
    // 1. Recibe los datos del body
    const { name, description, price, image_url, ciudad, region, lat, lng } = req.body

    // 2. Valida campos obligatorios
    if (!name || !price) {
        return res.status(400).json({ error: 'Nombre y precio son obligatorios' })
    }

    // 3. Inserta el producto en la DB
    const result = await pool.query(
        `INSERT INTO products 
      (name, description, price, image_url, ciudad, region, lat, lng) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
     RETURNING *`,
        [name, description, price, image_url, ciudad, region, lat, lng]
    )

    // 4. Responde 201 Created con el producto creado
    res.status(201).json({ product: result.rows[0] })
}