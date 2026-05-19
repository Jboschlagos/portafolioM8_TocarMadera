// ── Importaciones ──────────────────────────────────────────────
import pool from "../config/db.js";

// ── Obtener todos los productos ────────────────────────────────
export const getProducts = async (req, res) => {
  try {
    const result = await pool.query(`
            SELECT 
              p.*,
              COALESCE(
                json_agg(
                  json_build_object('id', pi.id, 'url', pi.image_url, 'orden', pi.orden)
                  ORDER BY pi.orden
                ) FILTER (WHERE pi.id IS NOT NULL),
                '[]'
              ) AS imagenes
            FROM products p
            LEFT JOIN product_images pi ON p.id = pi.product_id
            GROUP BY p.id
            ORDER BY p.id DESC
        `);
    res.status(200).json({ products: result.rows });
  } catch (error) {
    console.error("Error en getProducts:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};
// ── Crear producto (solo admin) ────────────────────────────────
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image_url, ciudad, region, lat, lng } =
      req.body;

    if (!name || !price) {
      return res
        .status(400)
        .json({ error: "Nombre y precio son obligatorios" });
    }

    const result = await pool.query(
      `INSERT INTO products 
             (name, description, price, image_url, ciudad, region, lat, lng) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
             RETURNING *`,
      [name, description, price, image_url, ciudad, region, lat, lng],
    );
    res.status(201).json({ product: result.rows[0] });
  } catch (error) {
    console.error("Error en createProduct:", error);
    res.status(500).json({ error: "Error al crear producto" });
  }
};

// ── Vincular imagen a producto ─────────────────────────────────
export const addProductImage = async (req, res) => {
  try {
    const { productId, imageUrl } = req.body;

    if (!productId || !imageUrl) {
      return res
        .status(400)
        .json({ error: "productId e imageUrl son obligatorios" });
    }

    const result = await pool.query(
      "INSERT INTO product_images (product_id, image_url) VALUES ($1, $2) RETURNING *",
      [productId, imageUrl],
    );
    res.status(201).json({ image: result.rows[0] });
  } catch (error) {
    console.error("Error en addProductImage:", error);
    res.status(500).json({ error: "Error al vincular imagen" });
  }
};
