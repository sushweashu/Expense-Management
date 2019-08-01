const express = require('express');
const bodyParser = require('body-parser');

const allowedOrigins = ['http://localhost:8000', 'http://localhost:4200'];
const app = express();

app.use(bodyParser.json());


// Setting cors
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});



app.use('/category', require('./controller/categoryController'));
app.use('/expense', require('./controller/expenseController'));

module.exports = app;