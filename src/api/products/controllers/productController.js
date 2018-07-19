import {APP} from '../../config';
import {apiService} from '../../api';
import axios from 'axios';
import _ from 'lodash';

/**
 * @param req
 * @param res
 * @param next
 *
 * Returns array with exchange product objects.
 */
function getAllProducts(req, res, next) {

  axios.all([
      _getProductByExchanges(APP.MONEEDA.EXCHANGES.BNB),
      _getProductByExchanges(APP.MONEEDA.EXCHANGES.BTX),
      _getProductByExchanges(APP.MONEEDA.EXCHANGES.BFX),
  ]).then(axios.spread(function (bnb, btx, bfx) {
      const intersection = _.intersectionBy(bnb.data, btx.data, bfx.data, 'id');
      res.send(intersection);
  })).catch(err => {
    next(new Error(err))
  });

}

/**
 * @param req
 * @param res
 * @param next
 *
 * Returns array with product price objects.
 */
function getProductPrice(req, res, next) {
  const product = req.params.product;
  axios.all([
    _getProductPriceByExchanges(APP.MONEEDA.EXCHANGES.BNB, product),
    _getProductPriceByExchanges(APP.MONEEDA.EXCHANGES.BTX, product),
    _getProductPriceByExchanges(APP.MONEEDA.EXCHANGES.BFX, product),
  ]).then(axios.spread(function (bnb, btx, bfx) {
    res.send({
      [APP.MONEEDA.EXCHANGES.BNB]: {...bnb.data, name: APP.MONEEDA.EXCHANGES.BNB},
      [APP.MONEEDA.EXCHANGES.BTX]: {...btx.data, name: APP.MONEEDA.EXCHANGES.BTX},
      [APP.MONEEDA.EXCHANGES.BFX]: {...bfx.data, name: APP.MONEEDA.EXCHANGES.BFX},
    });
  })).catch(err => {
    next(new Error(err))
  });
}

/**
 * @param {string} exchange
 *
 * Returns a product promise from api.
 */
function _getProductByExchanges(exchange){
  return apiService.get('exchanges/' + exchange + '/products');
}

/**
 * @param {string} exchange
 * @param {string} product
 *
 * Returns a product price promise from api.
 */
function _getProductPriceByExchanges(exchange, product){
  return apiService.get('exchanges/' + exchange + '/ticker?product=' + product);
}

export {
  getAllProducts,
  getProductPrice,
}