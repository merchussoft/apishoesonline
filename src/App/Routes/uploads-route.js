const route = require('express').Router();
const upload  = require('../config/multer');
const { listarImagenes, subirImagen, verImagen } = require('../Controllers/Upload-ci');


route.get('/', listarImagenes);
route.post('/upload', upload.single('image'), subirImagen);
route.get('/image/:id', verImagen);

module.exports = route;

