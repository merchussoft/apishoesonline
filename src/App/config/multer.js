const multer = require('multer');

/**exports.upload = multer({ storage: multer.memoryStorage}); */

const storage = multer.memoryStorage();

const upload = multer({ dest: 'uploads/' });

module.exports = upload;