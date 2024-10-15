
const { createPathEnv, nodeEnv } = require('./src/App/config/Config');
require('dotenv').config({
    path: createPathEnv(nodeEnv())
});
const app = require('./src/server');

app.listen(app.get('port'), () => console.log(`SERVER RUNNING IN PORT ${app.get('port')}`));
  