const express = require('express');
const config = require('config');
const router = require('./router');
const bodyParser = require('body-parser');
const constant = require('./minxin/constant');

const app = express();

app.use(bodyParser.json());
router(app);

app.use((err, req, res, next) => {
    if (err.status === constant.httpCode.Internal_Server_Error) {
        next(err);
    }
    res.status(err.status).send(err.stack);
});

app.use((err, req, res, next) => {
    res.status(err.status).send(err.stack);
});


app.listen(config.get('httpPort'), () => {
    console.log('server started at http://localhost:' + config.get('httpPort'));   // eslint-disable-line no-console
});

module.exports = app;