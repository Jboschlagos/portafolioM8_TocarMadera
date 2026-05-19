-- ════════════════════════════════════════════════════════════════
-- TEMPLATE: Insertar entrevistas en la tabla
-- Tocar Madera | Mercado En Línea Colaborativo
-- ════════════════════════════════════════════════════════════════
-- 
-- INSTRUCCIONES:
-- 1. Copia este bloque completo para cada entrevista
-- 2. Reemplaza los valores entre [CORCHETES] con tus datos
-- 3. Mantén las comillas simples alrededor de strings
-- 4. La fecha debe estar en formato YYYY-MM-DD
-- 5. Los campos lat/lng son opcionales (puedes dejar NULL)
-- 6. Ejecuta en tu BD de Neon
--
-- ════════════════════════════════════════════════════════════════

-- ── ARTESANO 1 ─────────────────────────────────────────────────
INSERT INTO entrevistas (
    titulo,
    artesano,
    oficio,
    descripcion,
    tecnica,
    youtube_id,
    imagen_principal,
    fecha,
    ciudad,
    region,
    lat,
    lng
) VALUES (
    '[TÍTULO DE LA ENTREVISTA]',
    '[NOMBRE DEL ARTESANO]',
    '[OFICIO]',
    '[DESCRIPCIÓN DETALLADA DE LA ENTREVISTA - puede ser largo]',
    '[DESCRIPCIÓN DE LA TÉCNICA UTILIZADA]',
    '[ID_YOUTUBE - ej: dQw4w9WgXcQ]',
    '[URL_IMAGEN - ej: https://example.com/image.jpg]',
    '[FECHA - YYYY-MM-DD - ej: 2024-03-15]',
    '[CIUDAD - ej: Valparaíso]',
    '[REGIÓN - ej: Región de Valparaíso]',
    [-33.0472],  -- [LATITUD - opcional, puede ser NULL]
    [-71.6127]   -- [LONGITUD - opcional, puede ser NULL]
);

-- ── ARTESANO 2 ─────────────────────────────────────────────────
INSERT INTO entrevistas (
    titulo,
    artesano,
    oficio,
    descripcion,
    tecnica,
    youtube_id,
    imagen_principal,
    fecha,
    ciudad,
    region,
    lat,
    lng
) VALUES (
    '[TÍTULO DE LA ENTREVISTA]',
    '[NOMBRE DEL ARTESANO]',
    '[OFICIO]',
    '[DESCRIPCIÓN DETALLADA DE LA ENTREVISTA - puede ser largo]',
    '[DESCRIPCIÓN DE LA TÉCNICA UTILIZADA]',
    '[ID_YOUTUBE - ej: dQw4w9WgXcQ]',
    '[URL_IMAGEN - ej: https://example.com/image.jpg]',
    '[FECHA - YYYY-MM-DD - ej: 2024-03-15]',
    '[CIUDAD - ej: Valparaíso]',
    '[REGIÓN - ej: Región de Valparaíso]',
    NULL,  -- [Omite si no tienes latitud]
    NULL   -- [Omite si no tienes longitud]
);

-- ── ARTESANO 3 ─────────────────────────────────────────────────
INSERT INTO entrevistas (
    titulo,
    artesano,
    oficio,
    descripcion,
    tecnica,
    youtube_id,
    imagen_principal,
    fecha,
    ciudad,
    region,
    lat,
    lng
) VALUES (
    '[TÍTULO DE LA ENTREVISTA]',
    '[NOMBRE DEL ARTESANO]',
    '[OFICIO]',
    '[DESCRIPCIÓN DETALLADA DE LA ENTREVISTA - puede ser largo]',
    '[DESCRIPCIÓN DE LA TÉCNICA UTILIZADA]',
    '[ID_YOUTUBE - ej: dQw4w9WgXcQ]',
    '[URL_IMAGEN - ej: https://example.com/image.jpg]',
    '[FECHA - YYYY-MM-DD - ej: 2024-03-15]',
    '[CIUDAD - ej: Valparaíso]',
    '[REGIÓN - ej: Región de Valparaíso]',
    NULL,
    NULL
);

-- ════════════════════════════════════════════════════════════════
-- EJEMPLO COMPLETADO (elimina los corchetes en tus inserts):
-- ════════════════════════════════════════════════════════════════

-- INSERT INTO entrevistas (
--     titulo,
--     artesano,
--     oficio,
--     descripcion,
--     tecnica,
--     youtube_id,
--     imagen_principal,
--     fecha,
--     ciudad,
--     region,
--     lat,
--     lng
-- ) VALUES (
--     'El real valor del trabajo en madera',
--     'Patricio Muñoz',
--     'Carpintero y tallador en madera nativa',
--     'Don Patricio Muñoz lleva más de 32 años trabajando la madera en su taller del cerro Alegre, en Valparaíso.',
--     'Carpintería tradicional con ensambles mecánicos. No utiliza máquinas de producción masiva.',
--     'dQw4w9WgXcQ',
--     'https://example.com/patricio.jpg',
--     '2024-03-15',
--     'Valparaíso',
--     'Región de Valparaíso',
--     -33.0472,
--     -71.6127
-- );

-- ════════════════════════════════════════════════════════════════
-- NOTAS IMPORTANTES:
-- ════════════════════════════════════════════════════════════════
-- 
-- • youtube_id: Solo el código (ej: dQw4w9WgXcQ)
--   NO incluyas la URL completa
--
-- • imagen_principal: Asegúrate que sea una URL válida
--   Puede ser de Cloudinary, Google Drive, o cualquier host
--
-- • fecha: Formato obligatorio YYYY-MM-DD
--   Ejemplo correcto: 2024-12-25
--   Ejemplo incorrecto: 25/12/2024
--
-- • lat/lng: Opcional, solo si tienes coordenadas
--   Puedes dejarlos como NULL
--
-- • descripcion y tecnica: Pueden ser textos largos
--   Puedes usar saltos de línea dentro del texto
--
-- ════════════════════════════════════════════════════════════════
