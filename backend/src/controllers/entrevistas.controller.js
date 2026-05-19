// ── Importaciones ──────────────────────────────────────────────
import pool from "../config/db.js";

// ── Obtener todas las entrevistas (público) ────────────────────
export const getEntrevistas = async (req, res) => {
  try {
    const {
      oficio,
      ciudad,
      fecha_inicio,
      fecha_fin,
      limite = 10,
      offset = 0,
    } = req.query;

    // 1. Construir query base
    let query = "SELECT * FROM entrevistas WHERE 1=1";
    const params = [];

    // 2. Agregar filtros si existen
    if (oficio) {
      query += " AND oficio ILIKE $" + (params.length + 1);
      params.push(`%${oficio}%`);
    }

    if (ciudad) {
      query += " AND ciudad ILIKE $" + (params.length + 1);
      params.push(`%${ciudad}%`);
    }

    if (fecha_inicio) {
      query += " AND fecha >= $" + (params.length + 1);
      params.push(fecha_inicio);
    }

    if (fecha_fin) {
      query += " AND fecha <= $" + (params.length + 1);
      params.push(fecha_fin);
    }

    // 3. Ordenar por fecha descendente y paginar
    query +=
      " ORDER BY fecha DESC LIMIT $" +
      (params.length + 1) +
      " OFFSET $" +
      (params.length + 2);
    params.push(parseInt(limite), parseInt(offset));

    // 4. Ejecutar query
    const result = await pool.query(query, params);

    // 5. Obtener total de entrevistas para paginación
    let countQuery = "SELECT COUNT(*) as total FROM entrevistas WHERE 1=1";
    const countParams = [];

    if (oficio) {
      countQuery += " AND oficio ILIKE $" + (countParams.length + 1);
      countParams.push(`%${oficio}%`);
    }
    if (ciudad) {
      countQuery += " AND ciudad ILIKE $" + (countParams.length + 1);
      countParams.push(`%${ciudad}%`);
    }
    if (fecha_inicio) {
      countQuery += " AND fecha >= $" + (countParams.length + 1);
      countParams.push(fecha_inicio);
    }
    if (fecha_fin) {
      countQuery += " AND fecha <= $" + (countParams.length + 1);
      countParams.push(fecha_fin);
    }

    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].total);

    // 6. Responder
    res.status(200).json({
      entrevistas: result.rows,
      total,
      pagina: Math.floor(parseInt(offset) / parseInt(limite)) + 1,
      por_pagina: parseInt(limite),
    });
  } catch (error) {
    console.error("Error en getEntrevistas:", error);
    res.status(500).json({ error: "Error al obtener entrevistas" });
  }
};

// ── Obtener 3 entrevistas aleatorias (para landing) ────────────
export const getEntrevistasAleatorias = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM entrevistas ORDER BY RANDOM() LIMIT 3",
    );

    res.status(200).json({ entrevistas: result.rows });
  } catch (error) {
    console.error("Error en getEntrevistasAleatorias:", error);
    res.status(500).json({ error: "Error al obtener entrevistas" });
  }
};

// ── Obtener una entrevista por ID ──────────────────────────────
export const getEntrevistaById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM entrevistas WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Entrevista no encontrada" });
    }

    res.status(200).json({ entrevista: result.rows[0] });
  } catch (error) {
    console.error("Error en getEntrevistaById:", error);
    res.status(500).json({ error: "Error al obtener entrevista" });
  }
};

// ── Crear entrevista (solo admin) ──────────────────────────────
export const createEntrevista = async (req, res) => {
  try {
    const {
      titulo,
      artesano,
      oficio,
      descripcion,
      tecnica,
      instagram_url,
      imagen_principal,
      fecha,
      ciudad,
      region,
      lat,
      lng,
    } = req.body;

    // Validar campos obligatorios
    if (!titulo || !artesano || !oficio || !instagram_url || !fecha) {
      return res
        .status(400)
        .json({
          error:
            "Faltan campos obligatorios: titulo, artesano, oficio, instagram_url, fecha",
        });
    }

    const result = await pool.query(
      `INSERT INTO entrevistas (titulo, artesano, oficio, descripcion, tecnica, instagram_url, imagen_principal, fecha, ciudad, region, lat, lng)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
             RETURNING *`,
      [
        titulo,
        artesano,
        oficio,
        descripcion,
        tecnica,
        instagram_url,
        imagen_principal,
        fecha,
        ciudad,
        region,
        lat,
        lng,
      ],
    );

    res
      .status(201)
      .json({
        entrevista: result.rows[0],
        message: "Entrevista creada exitosamente",
      });
  } catch (error) {
    console.error("Error en createEntrevista:", error);
    res.status(500).json({ error: "Error al crear entrevista" });
  }
};

// ── Actualizar entrevista (solo admin) ─────────────────────────
export const updateEntrevista = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      titulo,
      artesano,
      oficio,
      descripcion,
      tecnica,
      instagram_url,
      imagen_principal,
      fecha,
      ciudad,
      region,
      lat,
      lng,
    } = req.body;

    // Validar que la entrevista existe
    const check = await pool.query("SELECT id FROM entrevistas WHERE id = $1", [
      id,
    ]);
    if (check.rows.length === 0) {
      return res.status(404).json({ error: "Entrevista no encontrada" });
    }

    const result = await pool.query(
      `UPDATE entrevistas 
             SET titulo = COALESCE($1, titulo),
                 artesano = COALESCE($2, artesano),
                 oficio = COALESCE($3, oficio),
                 descripcion = COALESCE($4, descripcion),
                 tecnica = COALESCE($5, tecnica),
                 instagram_url = COALESCE($6, instagram_url),
                 imagen_principal = COALESCE($7, imagen_principal),
                 fecha = COALESCE($8, fecha),
                 ciudad = COALESCE($9, ciudad),
                 region = COALESCE($10, region),
                 lat = COALESCE($11, lat),
                 lng = COALESCE($12, lng),
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $13
             RETURNING *`,
      [
        titulo,
        artesano,
        oficio,
        descripcion,
        tecnica,
        instagram_url,
        imagen_principal,
        fecha,
        ciudad,
        region,
        lat,
        lng,
        id,
      ],
    );

    res
      .status(200)
      .json({
        entrevista: result.rows[0],
        message: "Entrevista actualizada exitosamente",
      });
  } catch (error) {
    console.error("Error en updateEntrevista:", error);
    res.status(500).json({ error: "Error al actualizar entrevista" });
  }
};

// ── Eliminar entrevista (solo admin) ───────────────────────────
export const deleteEntrevista = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM entrevistas WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Entrevista no encontrada" });
    }

    res
      .status(200)
      .json({
        message: "Entrevista eliminada exitosamente",
        entrevista: result.rows[0],
      });
  } catch (error) {
    console.error("Error en deleteEntrevista:", error);
    res.status(500).json({ error: "Error al eliminar entrevista" });
  }
};
