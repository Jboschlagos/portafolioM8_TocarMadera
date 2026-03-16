// ── Importaciones ──────────────────────────────────────────────
import pool from '../config/db.js'

// ── Agregar producto al carrito ────────────────────────────────

export const addToCart = async (req, res) => {
    // 1. Obtiene el user_id del token (lo adjuntó verifyToken)
    const userId = req.userId

    // 2. Recibe el producto y cantidad del body
    const { productId, quantity } = req.body

    // 3. Valida que no falten datos
    if (!productId || !quantity) {
        return res.status(400).json({ error: 'productId y quantity son obligatorios' })
    }

    // 4. Inserta en cart_items
    const result = await pool.query(
        'INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [userId, productId, quantity]
    )

    // 5. Responde 201 Created
    res.status(201).json({ cartItem: result.rows[0] })
}

// ── Obtener carrito del usuario ────────────────────────────────
export const getCart = async (req, res) => {
    // 1. Obtiene el user_id del token
    const userId = req.userId

    // 2. Consulta el carrito con JOIN para obtener datos del producto
    const result = await pool.query(
        `SELECT 
        cart_items.id,
        cart_items.product_id,
        cart_items.quantity,
        products.name,
        products.price,
        (SELECT image_url FROM product_images 
        WHERE product_id = products.id 
        ORDER BY orden ASC LIMIT 1) AS image_url
    FROM cart_items
    JOIN products ON cart_items.product_id = products.id
    WHERE cart_items.user_id = $1`,
        [userId]
    )

    // 3. Responde 200 OK con los items del carrito
    res.status(200).json({ cart: result.rows })
}

// ── Eliminar producto del carrito ──────────────────────────────
export const removeFromCart = async (req, res) => {
    // 1. Obtiene el user_id del token
    const userId = req.userId

    // 2. Obtiene el productId de los parámetros de la URL
    const { productId } = req.params

    // 3. Elimina el item del carrito
    const result = await pool.query(
        'DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2 RETURNING *',
        [userId, productId]
    )

    // 4. Si no existía ese producto en el carrito, responde 404
    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Producto no encontrado en el carrito' })
    }

    // 5. Responde 200 OK
    res.status(200).json({ message: 'Producto eliminado del carrito' })
}