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
-- ── ARTESANO 1: Hugo Almonacid ─────────────────────────────────
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
    'El oficio ancestral de la carpintería de ribera en Calbuco',
    'Hugo Almonacid Díaz',
    'Carpintero de Ribera',
    'Hugo Almonacid Díaz es Ingeniero Naval y Carpintero de Ribera, oficio que aprendió de su padre, José Almonacid, y que ha estado presente en su familia durante cuatro generaciones. Es presidente de la Agrupación de Carpinteros de Ribera de las Aguas Azules en Calbuco y ha dedicado su vida a visibilizar y preservar este saber tradicional que forma parte de la cultura marítima del sur de Chile. En marzo de 2025, viajó junto a su padre al País Vasco como invitados de honor en el Festival Marítimo de Pasaia, donde construyeron una lancha chilota en el taller de Albaola. Actualmente continúa profundizando su aprendizaje en España, manteniendo viva una tradición que se transmite con las manos, el corazón y la historia familiar.',
    'Construcción tradicional de lanchas y embarcaciones en madera. Técnicas ancestrales de carpintería naval chilota que combinan conocimiento empírico con principios de ingeniería. Uso de maderas nativas del sur de Chile y ensambles mecánicos tradicionales sin tornillería moderna.',
    'h5-VRLJp8-4',
    'https://res.cloudinary.com/dfwtphkn8/image/upload/v1779204328/Screenshot_20250719-093522.Instagram_hr0sab.png',
    '2025-07-26',
    'Calbuco',
    'Región de Los Lagos',
    -41.7667,
    -73.1167
);