const sharp = require('sharp');

const { listarImagenesFull, listarImagenFull } = require('../Models/Upload-model');
const { insertTable } = require('../config/ConexDb');
 
const listarImagenes = async (req, res) => {
    res.json(await listarImagenesFull());
}

const subirImagen = async (req, res) => {
    try {

        const file = req.file;
        const fullHost = `${req.protocol}://${req.hostname}:${req.socket.localPort}`;

        const quitar_extension = file.originalname.replace(/\.[^/.]+$/, "")

        const filename  = `${quitar_extension.replace(" ", "_")}.webp`;
        const mime_type = 'image/webp'
        const fieldname = file.fieldname
        const size = file.size

        const compressed_image_buffer = await sharp(file.buffer)
        .resize(720)
        .webp({ quality: 80 })
        .toBuffer();

        const data = await insertTable('image_metadata', {image_name: filename, mime_type, fieldname, size});
        await insertTable('images', {image_data: compressed_image_buffer, cod_image_metadata: data.data, url: `${fullHost}/image/${data.data}/${filename}`});

        res.status(200).json({code: 200, message: 'Imagen cargada y comprimida exitosamente'});
        
    } catch(e) {
        console.log('mirando este error ===== ', e)
        res.status(500).json({message: 'Error al subir la imagen',  code: 500})
    }
}


const verImagen = async (req, res) => {
    try {

        const result = await listarImagenFull(req.params.id, req.params.ruta);
        const data = result.data;

        if(data.lenght === 0) return res.status(404).json({ code: 404, message: 'Imagen no encontrada'});

        const imagen_data = data[0].image_data;
        const mime_type = data[0].mime_type;

        res.setHeader('Content-Type', mime_type);
        res.send(imagen_data);
    } catch (err) {
        console.log('mirando el error de encontrar la imagen ', err);
        res.status(500).json({ code: 500, message: 'Error al recuperar la imagen' });
    }
}


module.exports = {
    listarImagenes,
    subirImagen,
    verImagen
}