const route = require('express').Router();
const { upload } = require('../config/multer');
const { listarImagenes } = require('../Controllers/Upload-ci');


route.get('/', listarImagenes);

module.exports = route;

