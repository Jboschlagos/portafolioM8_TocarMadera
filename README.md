# 🪵 Tocar Madera | Mercado En Línea Colaborativo

Plataforma de e-commerce artesanal chilena construida como proyecto de portafolio del Módulo 8 del Bootcamp Fullstack JavaScript de Desafío Latam.

---

## 🌐 Demo en producción

| Servicio    | URL                                                     |
| ----------- | ------------------------------------------------------- |
| Frontend    | https://portafolio-m8-tocar-madera-5ve26h91o.vercel.app |
| Backend API | https://tocar-madera-backend.onrender.com               |

---

## 📖 Descripción del proyecto

Tocar Madera es un mercado colaborativo en línea para artesanos y carpinteros chilenos. Permite publicar productos artesanales con georreferenciación, visualizarlos en un mapa de Chile, y comprarlos con autenticación segura.

### Características principales

- Catálogo público de productos con mapa interactivo de Chile (Leaflet.js)
- Registro y login con autenticación JWT
- Carrito de compras protegido por token
- Subida de imágenes a Cloudinary
- Panel de administración para gestión de productos e imágenes
- Sección de noticias y entrevistas
- Diseño responsive con Bootstrap 5

---

## 🛠️ Stack tecnológico

### Backend

- Node.js + Express
- PostgreSQL (Neon) con consultas SQL directas (pg)
- JWT para autenticación stateless
- bcryptjs para hasheo de contraseñas
- Cloudinary para almacenamiento de imágenes
- express-fileupload para recepción de archivos

### Frontend

- HTML5 semántico + CSS3
- Bootstrap 5 + Bootstrap Icons
- Google Fonts (Inter)
- Leaflet.js para mapas interactivos
- Fetch API para consumo de endpoints

### Servicios en la nube

- Neon — PostgreSQL en la nube
- Cloudinary — almacenamiento de imágenes
- Render — deploy del backend
- Vercel — deploy del frontend

---

## 🗂️ Estructura del proyecto

```
portafolioM8_TocarMadera/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # Conexión a PostgreSQL (Neon)
│   │   ├── controllers/
│   │   │   ├── auth.controller.js     # Registro y login
│   │   │   ├── products.controller.js # CRUD de productos
│   │   │   ├── cart.controller.js     # Gestión del carrito
│   │   │   └── upload.controller.js   # Subida de imágenes
│   │   ├── middleware/
│   │   │   └── auth.middleware.js     # Verificación JWT y rol admin
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── products.routes.js
│   │   │   ├── cart.routes.js
│   │   │   └── upload.routes.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── components/
│   │   ├── navbar.html
│   │   └── footer.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── config.js      # URL de la API
│   │   ├── components.js  # Carga navbar y footer
│   │   ├── auth.js        # Login y registro
│   │   ├── landing.js     # Últimos productos
│   │   ├── products.js    # Catálogo + mapa + modal
│   │   ├── cart.js        # Carrito
│   │   └── upload.js      # Subida de imágenes
│   ├── img/
│   ├── landing.html       # Portada pública
│   ├── index.html         # Login / Register
│   ├── products.html      # Catálogo + mapa
│   ├── cart.html          # Carrito
│   ├── upload.html        # Admin — subida de imágenes
│   └── vercel.json
├── consultasDesdeTerminal.md
└── README.md
```

---

## 🗄️ Base de datos

### Tablas

```sql
-- Usuarios
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'user'
);

-- Productos
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  ciudad VARCHAR(100),
  region VARCHAR(100),
  lat DECIMAL(9,6),
  lng DECIMAL(9,6)
);

-- Imágenes de productos
CREATE TABLE product_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  orden INTEGER DEFAULT 0
);

-- Carrito
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1
);
```

---

## 🔌 Endpoints de la API

| Método | Endpoint               | Descripción                | Protección |
| ------ | ---------------------- | -------------------------- | ---------- |
| POST   | `/api/auth/register`   | Registro de usuario        | Pública    |
| POST   | `/api/auth/login`      | Login — devuelve JWT       | Pública    |
| GET    | `/api/products`        | Lista todos los productos  | Pública    |
| POST   | `/api/products`        | Crea un producto           | Admin      |
| POST   | `/api/products/images` | Vincula imagen a producto  | Admin      |
| POST   | `/api/cart`            | Agrega producto al carrito | JWT        |
| GET    | `/api/cart`            | Ver carrito del usuario    | JWT        |
| DELETE | `/api/cart/:productId` | Eliminar del carrito       | JWT        |
| POST   | `/api/upload`          | Sube imagen a Cloudinary   | JWT        |

---

## ⚙️ Instalación local

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/portafolioM8_TocarMadera.git
cd portafolioM8_TocarMadera
```

### 2. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales reales:

```
PORT=3000
DATABASE_URL=postgresql://usuario:contraseña@host/neondb?sslmode=require
JWT_SECRET=tu_clave_secreta
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

### 4. Iniciar el servidor

```bash
npm run dev
```

### 5. Abrir el frontend

Abre `frontend/landing.html` con Live Server en VS Code.

---

## 📝 Decisiones técnicas destacadas

### ¿Por qué pg directo y no Sequelize?

Se eligió `pg` con SQL directo para entender a fondo las consultas y tener control total sobre los JOINs, especialmente para las consultas de productos con imágenes y carrito.

### ¿Por qué Cloudinary y no Multer local?

Render no tiene sistema de archivos persistente — los archivos guardados localmente se pierden en cada redeploy. Cloudinary garantiza que las imágenes persisten independientemente del servidor.

### ¿Por qué Render para el backend y Vercel para el frontend?

Vercel está optimizado para funciones serverless y sitios estáticos. Express es un servidor tradicional que requiere un proceso corriendo continuamente — Render lo maneja perfectamente.

### ¿Por qué curl en vez de Thunder Client?

Thunder Client requiere versión de pago para enviar archivos (imágenes). curl es gratuito, viene instalado en cualquier sistema y funciona tanto en desarrollo como para probar la API en producción. Ver `consultasDesdeTerminal.md` para referencia completa.

---

## 🚀 Roadmap v2

- [ ] Blog colaborativo con texto + imágenes por artesano
- [ ] Feed de Instagram embebido
- [ ] Pasarela de pago
- [ ] Múltiples vendedores con roles
- [ ] Panel de administración completo
- [ ] Filtros por región en el mapa

---

## 👤 Autor

**Jorge Bosch** — Estudiante Bootcamp Fullstack JavaScript, Desafío Latam  
Reducido Estudio — carpintería + desarrollo web  
[GitHub](https://github.com/Jboschlagos) | [Instagram](https://www.instagram.com/tocarmadera_)
