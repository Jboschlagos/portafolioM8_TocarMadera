// ── Importaciones ─────────────────────────────────────────────
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";

// ── Crear la aplicación ────────────────────────────────────────
const app = express();

// ── Middlewares globales ───────────────────────────────────────
// Permite peticiones desde el frontend en Vercel
app.use(
  cors({
    origin: (origin, callback) => {
      // Permite localhost y cualquier subdominio de vercel.app
      const allowed = ["http://localhost:5500", "http://127.0.0.1:5500"];
      if (
        !origin ||
        allowed.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("No permitido por CORS"));
      }
    },
  }),
);
// Permite que el servidor entienda JSON en el req.body
app.use(express.json());
// Permite recibir archivos en las peticiones
app.use(fileUpload({ useTempFiles: true }));

// ── Rutas ─────────────────────────────────────────────────────
// Cada import trae el archivo de rutas correspondiente
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import entrevistasRoutes from "./routes/entrevistas.routes.js";

// Cada app.use monta las rutas bajo su prefijo correspondiente
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/entrevistas", entrevistasRoutes);

// ── Puerto y arranque ──────────────────────────────────────────
// Lee el puerto desde .env, si no existe usa 3000 por defecto
const PORT = process.env.PORT || 3000;

// Abre la puerta — el servidor empieza a escuchar peticiones
app.listen(PORT, () => {
  console.log(`🪵 Tocar Madera | Servidor corriendo en puerto ${PORT}`);
});
