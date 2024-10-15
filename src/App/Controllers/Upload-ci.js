const { listarImagenesFull } = require('../Models/Upload-model');

const listarImagenes = async (req, res) => {
    res.json(await listarImagenesFull());
}



module.exports = {
    listarImagenes
}