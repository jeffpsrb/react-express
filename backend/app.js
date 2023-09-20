require('./config/mongoose')
const express = require('express');
const app = express();
const logger = require('morgan');
const productRouterV2 = require('./app/products/routes')
const productRouterV1 = require('./app/product_v2/routes')
const cors = require('cors')

app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use('/api/v1/', productRouterV1)
app.use('/api/v2/', productRouterV2)

app.use((req, res, next) => {
    res.status(404)
    res.send({
        status: 'Failed',
        message: 'Resource' + req.originalUrl + 'Not Foud'
    })
}) 


app.listen(3000, () => console.log('server: http://localhost:3000'));