// ── Importaciones ──────────────────────────────────────────────
import pool from "../config/db.js";

// ── Agregar producto al carrito ────────────────────────────────

export const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ error: "productId y quantity son obligatorios" });
    }

    const result = await pool.query(
      "INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
      [userId, productId, quantity],
    );

    res.status(201).json({ cartItem: result.rows[0] });
  } catch (error) {
    console.error("Error en addToCart:", error);
    res.status(500).json({ error: "Error al agregar al carrito" });
  }
};

// ── Obtener carrito del usuario ────────────────────────────────
export const getCart = async (req, res) => {
  try {
    const userId = req.userId;

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
      [userId],
    );

    res.status(200).json({ cart: result.rows });
  } catch (error) {
    console.error("Error en getCart:", error);
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
};

// ── Eliminar producto del carrito ──────────────────────────────
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;

    const result = await pool.query(
      "DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2 RETURNING *",
      [userId, productId],
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Producto no encontrado en el carrito" });
    }

    res.status(200).json({ message: "Producto eliminado del carrito" });
  } catch (error) {
    console.error("Error en removeFromCart:", error);
    res.status(500).json({ error: "Error al eliminar del carrito" });
  }
};
