var express = require('express'),
    app     = module.exports = express();

require('./config/environments.js')(app, express);
require('./config/routes.js')(app);

app.listen(3000);
