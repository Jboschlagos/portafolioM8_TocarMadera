# 🖥️ Consultas desde la Terminal — Guía de referencia

## ¿Por qué desde la terminal?

Thunder Client requiere versión de pago para enviar archivos (imágenes).
`curl` es gratuito, viene instalado en cualquier sistema, y funciona tanto
en desarrollo local como para probar APIs desplegadas en producción.

---

## Estructura base de una consulta curl

```bash
curl -X [MÉTODO] [URL] \
  -H "[Header]" \
  -d '[Body JSON]'
```

| Parte | Qué hace                                       |
| ----- | ---------------------------------------------- |
| `-X`  | Define el método HTTP (GET, POST, PUT, DELETE) |
| `-H`  | Agrega un header a la petición                 |
| `-d`  | Envía datos en el body                         |
| `-F`  | Envía un archivo (form-data)                   |
| `\`   | Continúa el comando en la siguiente línea      |

---

## 🔐 Autenticación

### Registro de usuario

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "jorge", "email": "jorge@tocamadera.cl", "password": "madera2024"}'
```

### Login (guarda el token que devuelve)

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "jorge@tocamadera.cl", "password": "madera2024"}'
```

---

## 📦 Productos

### Obtener todos los productos (protegido)

```bash
curl -X GET http://localhost:3000/api/products \
  -H "Authorization: Bearer [TOKEN]"
```

---

## 🛒 Carrito

### Agregar producto al carrito (protegido)

```bash
curl -X POST http://localhost:3000/api/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [TOKEN]" \
  -d '{"productId": 1, "quantity": 2}'
```

### Ver carrito (protegido)

```bash
curl -X GET http://localhost:3000/api/cart \
  -H "Authorization: Bearer [TOKEN]"
```

### Eliminar producto del carrito (protegido)

```bash
curl -X DELETE http://localhost:3000/api/cart/[PRODUCT_ID] \
  -H "Authorization: Bearer [TOKEN]"
```

---

## 📸 Upload de imágenes

### Subir imagen a Cloudinary (protegido)

```bash
curl -X POST http://localhost:3000/api/upload \
  -H "Authorization: Bearer [TOKEN]" \
  -F "imagen=@/ruta/a/tu/imagen.jpg"
```

---

## 🌐 Consultas en producción

Reemplaza `http://localhost:3000` con la URL de tu API en Render:

```bash
curl -X GET https://tu-api.onrender.com/api/products \
  -H "Authorization: Bearer [TOKEN]"
```

---

## 📝 Notas

- Reemplaza `[TOKEN]` con el token que devuelve el login
- Reemplaza `[PRODUCT_ID]` con el id del producto
- En Windows Git Bash usa rutas con `/` no con `\` para archivos
