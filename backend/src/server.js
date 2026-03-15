// ── Importaciones ─────────────────────────────────────────────
import express from "express";
import cors from "cors";
import fileUpload from 'express-fileupload'

// ── Crear la aplicación ────────────────────────────────────────
const app = express();

// ── Middlewares globales ───────────────────────────────────────
// Permite que el frontend se comunique con el backend
app.use(cors());
// Permite que el servidor entienda JSON en el req.body
app.use(express.json());
// Permite recibir archivos en las peticiones
app.use(fileUpload({ useTempFiles: true }))

// ── Rutas ─────────────────────────────────────────────────────
// Cada import trae el archivo de rutas correspondiente
import authRoutes from './routes/auth.routes.js'
import productRoutes from './routes/products.routes.js'
import cartRoutes from './routes/cart.routes.js'
import uploadRoutes from './routes/upload.routes.js'

// Cada app.use monta las rutas bajo su prefijo correspondiente
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/upload', uploadRoutes)

// ── Puerto y arranque ──────────────────────────────────────────
// Lee el puerto desde .env, si no existe usa 3000 por defecto
const PORT = process.env.PORT || 3000

// Abre la puerta — el servidor empieza a escuchar peticiones
app.listen(PORT, () => {
    console.log(`🪵 Tocar Madera | Servidor corriendo en puerto ${PORT}`)
})