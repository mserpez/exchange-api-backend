// DEPENDENCIES
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import colors from 'colors';
// CONSTANTS
import {APP} from './src/api/config';
// MODULES
import {productRouter} from './src/api/products'

// SETUP APP
const app = express();
const PORT = 8007;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// INIT ROUTES
app.use(APP.APP_ROUTE_BASE, productRouter);

// LISTENING PORT
app.listen(PORT);

// ERROR MIDDLEWARE TO CATCH ERRORS.
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(400).send({
        code: 400,
        title: 'Oops, something went wrong!',
        message: err.message,
    });
});

// SERVER DATA LOG
console.log(colors.green(`API server started on: http://localhost:${PORT}`));
console.log(colors.gray('Documentation available on http://localhost:8080/docs'));