const express = require('express');
const bodyParser = require('body-parser');
const { required } = require('@hapi/joi');
const cookieParser = require('cookie-parser');

const app = express();
const router = express.Router();

const login = require('./routes/login');

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next()
})

router.use('/login', login);

/* Setting Base Url Of the Application */
app.use('/api', router);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log('app Error Status: ', err.message);
    const error = {
        error_code: err.status,
        error: err.message
    };
    res.statusCode = 500;
    res.json(error);
    next();
});

let port = 5020;
app.listen(port,
    function () {
        console.log(`Server started at port ${port}`)
    });