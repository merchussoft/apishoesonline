const { resultPromise, obtieneDatos, insertTable } = require('../config/ConexDb');
const cfg = require('../config/Config');


const listarImagenesFull = async () => {
    let sql = `SELECT  SUBSTRING_INDEX(image_name, '.', 1) as name_imagen, mime_type, size, fieldname, url
    FROM images i 
    JOIN image_metadata im on im.cod_image_metadata = i.cod_image_metadata`;

    return await resultPromise(sql);
}


const listarImagenFull = async (cod_image) => {
    let sql = `SELECT mime_type, image_data
    FROM images i 
    JOIN image_metadata im on im.cod_image_metadata = i.cod_image_metadata 
    WHERE i.cod_image_metadata = ? 
    LIMIT 1`;

    return await resultPromise(sql, [cod_image]);
}

module.exports = {
    listarImagenesFull,
    listarImagenFull
}