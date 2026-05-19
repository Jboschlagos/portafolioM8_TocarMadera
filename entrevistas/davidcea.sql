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
-- ── ARTESANO 1: David Cea ──────────────────────────────────────
INSERT INTO entrevistas (
    titulo,
    artesano,
    oficio,
    descripcion,
    youtube_id,
    imagen_principal,
    tecnica,
    fecha,
    ciudad,
    region,
    lat,
    lng
) VALUES (
    'El oficio ancestral de la carpintería en Antofagasta',
    'David Cea',
    'Carpintero',
    'La carpintería es uno de los oficios más antiguos de la humanidad, presente en todas partes y con infinitas posibilidades. Desde Antofagasta, la Unidad de Estudio y Trabajo de Gendarmería (CET), en conjunto con alianzas privadas, impulsa un proyecto donde la reinserción laboral se cruza con el aprendizaje del oficio y la economía circular, logrando una iniciativa de alto impacto social.' ||
    E'\n\n' ||
    'Este jueves 28 de agosto a las 19:30 hrs, conversaremos con David Cea (@taller.laclava) —sociólogo, carpintero e instructor de este hermoso proyecto— quien nos contará sobre su experiencia y participación.' ||
    E'\n\n' ||
    'Porque no todo son muebles de diseño: a veces lo sencillo es lo que tiene el mayor impacto.' ||
    E'\n\n' ||
    '✨ Acompáñanos y sé parte de esta reflexión.',
    'ayy0H_9iwhs',
    'https://res.cloudinary.com/dfwtphkn8/image/upload/v1779204339/IMG-20250811-WA0003_qlwtco.jpg',
    NULL,                          -- tecnica: completar si aplica
    '2025-08-24',
    'Antofagasta',
    'Región de Antofagasta',
    -23.6442,                      -- -23°38′39″S  →  -(23 + 38/60 + 39/3600)
    -70.4108                       -- -70°24′39″O  →  -(70 + 24/60 + 39/3600)
);
