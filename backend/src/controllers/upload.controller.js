// ── Importaciones ──────────────────────────────────────────────
import cloudinary from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config()

// ── Configuración de Cloudinary ────────────────────────────────
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// ── Subir imagen a Cloudinary ──────────────────────────────────
export const uploadImage = async (req, res) => {
    // 1. Verifica que llegó un archivo
    if (!req.files || !req.files.imagen) {
        return res.status(400).json({ error: 'No se recibió ninguna imagen' })
    }

    const file = req.files.imagen

    // 2. Valida la extensión del archivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.mimetype)) {
        return res.status(400).json({ error: 'Solo se permiten imágenes JPG, PNG o WEBP' })
    }

    // 3. Valida el tamaño máximo (2MB)
    const maxSize = 2 * 1024 * 1024
    if (file.size > maxSize) {
        return res.status(400).json({ error: 'La imagen no puede superar los 2MB' })
    }

    // 4. Sube la imagen a Cloudinary
    const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: 'tocar-madera'
    })

    // 5. Responde con el nombre y la URL de la imagen
    res.status(200).json({
        nombre: result.original_filename,
        url: result.secure_url
    })
}