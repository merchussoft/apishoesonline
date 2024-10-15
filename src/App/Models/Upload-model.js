const { resultPromise, obtieneDatos, insertTable } = require('../config/ConexDb');
const cfg = require('../config/Config');


const listarImagenesFull = async () => {
    let sql = 'SELECT * FROM images i JOIN image_metadata im on im.cod_image_metadata = i.cod_image_metadata';
    console.log('desde el modelo ', sql);
    return await resultPromise(sql);
}


module.exports = {
    listarImagenesFull
}