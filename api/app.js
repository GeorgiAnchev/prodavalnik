const express = require('express');
const accountRouter = require('./src/routers/account');
const productRouter = require('./src/routers/product');
const reviewRouter = require('./src/routers/review');
require('./src/db/mongoose');

const app = express();
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");

    next();
});

app.use(accountRouter);
app.use(productRouter);
app.use(reviewRouter);

app.get('/reviews/*', (req, res) => {
    res.send('nai dobroto neshto');
});

app.listen(3001, () => {
    console.log('Server is up on port ' + 3001)
});


