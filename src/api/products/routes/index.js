import express from 'express';
import { productController } from '../controllers';

// EXPRESS ROUTER FOR PRODUCT.
const productRouter = express.Router();

/*
*
* Return all products.
*
* */
productRouter.get('/products', productController.getAllProducts);

/*
*
* @param {string} product.
*
* Return product price.
*
* */
productRouter.get('/products/:product/prices', productController.getProductPrice);

export default productRouter;