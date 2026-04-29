/**
 * historias.js — Datos de entrevistas a artesanos
 * Tocar Madera | Mercado En Línea Colaborativo
 *
 * Estructura pensada para migrar a React + backend.
 * Cada objeto representa una entrevista completa.
 *
 * Campos del mapa (para React posterior):
 *   lat, lng, ciudad, region
 */

const HISTORIAS_DATA = [
  {
    id: 1,

    // ── Portada (card en landing) ──────────────────────────────
    imagen_portada: "img/historias/patricio-portada.jpg",
    artesano: "Patricio Muñoz",
    oficio: "Carpintero y tallador en madera nativa",
    frase_card: "La madera no se trabaja, se escucha.",

    // ── Localización ───────────────────────────────────────────
    ciudad: "Valparaíso",
    region: "Región de Valparaíso",
    lat: -33.0472,
    lng: -71.6127,

    // ── Modal: cabecera ────────────────────────────────────────
    imagen_cabecera: "img/historias/patricio-retrato.jpg",
    imagen_cabecera_alt: "img/historias/patricio-taller.jpg",

    // ── Modal: intro (texto largo) ─────────────────────────────
    intro: [
      "Don Patricio Muñoz lleva más de 32 años trabajando la madera en su taller del cerro Alegre, en Valparaíso. Aprendió el oficio de su padre, quien a su vez lo heredó de un carpintero alemán que llegó al puerto a mediados del siglo XX. En ese linaje silencioso de manos y herramientas, Patricio encontró su lenguaje.",
      "Su trabajo no sigue patrones. Cada pieza nace de la observación de la madera misma: sus vetas, sus nudos, sus irregularidades. 'Yo no le impongo una forma al árbol', dice mientras pasa los dedos por una tabla de raulí recién cepillada. 'Le pregunto qué quiere ser.' Esa filosofía impregna cada rincón del taller: virutas en el suelo, luz filtrada entre tablas apiladas, el olor denso de la leña y el aceite de linaza.",
      "Hoy trabaja principalmente muebles de encargo y piezas únicas para coleccionistas. Sus sillas y mesas aparecen en casas de Santiago, pero también en galerías de arte. Para Patricio, la distinción no importa: 'Una silla tiene que ser bella sentado y bella mirándola. Si logras eso, hiciste algo verdadero.'",
    ],

    // ── Modal: carrusel de imágenes ────────────────────────────
    imagenes: [
      {
        url: "img/historias/patricio-obra1.jpg",
        caption: "Mesa de comedor en raulí, 2023",
      },
      {
        url: "img/historias/patricio-obra2.jpg",
        caption: "Detalle del ensamble a cola de milano",
      },
      {
        url: "img/historias/patricio-obra3.jpg",
        caption: "Proceso de cepillado manual",
      },
      {
        url: "img/historias/patricio-taller2.jpg",
        caption: "Taller en cerro Alegre, Valparaíso",
      },
    ],

    // ── Modal: bloques temáticos ───────────────────────────────
    bloques: [
      {
        titulo: "Proceso",
        icono: "bi-tools",
        contenido:
          "El proceso comienza siempre con la madera en bruto: la recibe recién cortada, la apila durante meses para que seque al aire libre. 'La madera apresurada se mueve, se tuerce, te miente', explica. Una vez seca, el trabajo es completamente manual: garlopa, cepillo, formón. Nunca usa máquinas de producción masiva. El tiempo que tarda en hacer una silla —entre 40 y 60 horas— es parte del valor de la pieza.",
      },
      {
        titulo: "Técnica",
        icono: "bi-wrench",
        contenido:
          "Su técnica es una mezcla de carpintería tradicional chilena y métodos aprendidos de tratados europeos del siglo XIX que heredó de su padre. Privilegia los ensambles mecánicos —cola de milano, espiga y mortaja— por sobre el uso de pegamentos. 'Si está bien ensamblado, dura 200 años. Si depende del pegamento, depende de la suerte.' El acabado final es aceite de tung o linaza, nunca barniz: quiere que la madera respire.",
      },
      {
        titulo: "Madera",
        icono: "bi-tree",
        contenido:
          "Trabaja principalmente con raulí, roble pellín y lenga del sur de Chile. Rechaza el pino impregnado y el MDF. 'Son materiales para otra cosa, no para esto.' Compra la madera directamente a pequeños aserraderos del sur con quienes lleva años de relación. Conoce el origen de cada tabla: el fundo, la fecha de tala, el tiempo de secado. Para él, esa trazabilidad es parte del producto.",
      },
      {
        titulo: "Tiempo de ejecución",
        icono: "bi-clock",
        contenido:
          "Una silla de comedor tarda entre 40 y 60 horas de trabajo efectivo, distribuidas en 3 a 4 semanas. Una mesa grande puede llegar a 120 horas. Trabaja solo, sin ayudantes. 'Cuando entras un ayudante, la pieza deja de ser tuya del todo.' Acepta entre 4 y 6 encargos al año para mantener esa cadencia.",
      },
      {
        titulo: "Financiamiento",
        icono: "bi-currency-dollar",
        contenido:
          "Trabaja exclusivamente por encargo, con un anticipo del 50% al inicio. No tiene stock. Sus precios parten en $350.000 CLP para piezas pequeñas y pueden superar el millón en muebles de comedor. Nunca ha recibido fondos públicos ni postulado a FONDART: 'No tengo tiempo para los formularios.' Su red es el boca a boca entre coleccionistas y arquitectos.",
      },
    ],

    // ── Modal: ficha de datos duros ────────────────────────────
    ficha: [
      { label: "Años de oficio", valor: "32 años" },
      { label: "Especie principal", valor: "Raulí, roble pellín, lenga" },
      { label: "Tiempo por pieza", valor: "40–120 horas" },
      { label: "Precio desde", valor: "$350.000 CLP" },
      { label: "Origen de la madera", valor: "Sur de Chile (IX–X región)" },
      { label: "Técnica", valor: "Carpintería tradicional, ensamble mecánico" },
    ],

    // ── Fecha de publicación ───────────────────────────────────
    fecha: "Marzo 2025",
    tipo: "Entrevista",
  },

  {
    id: 2,

    imagen_portada: "img/historias/carmen-portada.jpg",
    artesano: "Carmen Vidal",
    oficio: "Talladora en madera y artista visual",
    frase_card: "Tallo para encontrar lo que ya estaba adentro.",

    ciudad: "Valdivia",
    region: "Región de Los Ríos",
    lat: -39.8142,
    lng: -73.2459,

    imagen_cabecera: "img/historias/carmen-retrato.jpg",
    imagen_cabecera_alt: "img/historias/carmen-taller.jpg",

    intro: [
      "Carmen Vidal llegó al tallado por un camino lateral. Estudió Bellas Artes en la Universidad Austral, trabajó años en pintura y fotografía, y un día encontró en el basural de un aserradero de Valdivia un tronco de alerce caído. 'Lo vi ahí y sentí que ya tenía una forma. Solo había que quitarle lo que sobraba.'",
      "Desde entonces, hace quince años, su obra oscila entre la escultura de exposición y los objetos de uso cotidiano: cuencos, bandejas, marcos, figuras. Trabaja en un galpón prestado a orillas del río Calle-Calle, rodeada de herramientas que fue juntando de a poco —muchas compradas en ferias, otras heredadas de talladores más viejos que ya no ejercen.",
      "Su trabajo ha sido reconocido en ferias de artesanía de Santiago y Valdivia, y sus piezas han llegado a coleccionistas de Argentina y España. Pero Carmen sigue viviendo en Valdivia, levantándose a las seis para trabajar antes de que llegue la lluvia y el frío del sur haga demasiado pesadas las gubias.",
    ],

    imagenes: [
      {
        url: "img/historias/carmen-obra1.jpg",
        caption: "Cuenco en alerce, 2024",
      },
      {
        url: "img/historias/carmen-obra2.jpg",
        caption: "Figura tallada en coihue",
      },
      {
        url: "img/historias/carmen-obra3.jpg",
        caption: "Detalle de textura con gubia",
      },
      {
        url: "img/historias/carmen-taller2.jpg",
        caption: "Galpón de trabajo, Valdivia",
      },
    ],

    bloques: [
      {
        titulo: "Proceso",
        icono: "bi-tools",
        contenido:
          "Carmen trabaja directamente sobre el tronco o bloque, sin boceto previo. 'El boceto me limita. Prefiero escuchar lo que la madera va diciendo.' Usa gubias de distintos calibres, formones y lijas de grano grueso a fino. El proceso de una pieza escultórica puede durar meses: trabaja en ella, la deja descansar, vuelve.",
      },
      {
        titulo: "Técnica",
        icono: "bi-wrench",
        contenido:
          "Su técnica es la talla directa, sin moldes ni plantillas. Para los objetos funcionales —cuencos, bandejas— usa también el torno de madera. El acabado varía según la pieza: aceite de oliva para los cuencos de uso alimenticio, cera de abeja para los objetos decorativos, y sin acabado para las esculturas que quieren mostrar la madera cruda.",
      },
      {
        titulo: "Madera",
        icono: "bi-tree",
        contenido:
          "Trabaja con maderas del sur: alerce recuperado de derrumbes o caídas naturales, coihue, mañío. 'Nunca corto un árbol vivo. Todo lo que uso es madera muerta o recuperada.' Eso limita su producción, pero es una restricción que asume como parte de su poética.",
      },
      {
        titulo: "Tiempo de ejecución",
        icono: "bi-clock",
        contenido:
          "Un cuenco pequeño puede estar listo en una tarde. Una escultura mediana tarda entre 2 y 6 semanas de trabajo intermitente. Las piezas grandes —que pueden pesar más de 50 kilos— han llegado a ocuparla durante 3 meses.",
      },
      {
        titulo: "Financiamiento",
        icono: "bi-currency-dollar",
        contenido:
          "Combina la venta directa en ferias con encargos a través de Instagram. Ha recibido dos Fondos de Cultura del Gobierno Regional para proyectos de difusión. 'El fondo no paga el trabajo, paga los materiales y te da tiempo.' Sus piezas parten en $80.000 CLP para objetos pequeños.",
      },
    ],

    ficha: [
      { label: "Años de oficio", valor: "15 años" },
      { label: "Especie principal", valor: "Alerce recuperado, coihue, mañío" },
      { label: "Tiempo por pieza", valor: "1 tarde – 3 meses" },
      { label: "Precio desde", valor: "$80.000 CLP" },
      {
        label: "Origen de la madera",
        valor: "Madera recuperada, sur de Chile",
      },
      { label: "Técnica", valor: "Talla directa, torno de madera" },
    ],

    fecha: "Febrero 2025",
    tipo: "Entrevista",
  },
];

window.HISTORIAS_DATA = HISTORIAS_DATA;
