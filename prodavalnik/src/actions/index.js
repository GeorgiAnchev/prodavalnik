import bestBuy from '../apis/bestBuy';
// import jsonPlaceholder from '../apis/jsonPlaceholder';
// import httpBin from '../apis/httpbin';
import api, { authHeader } from '../apis/api';
//import api, { authHeader } from '../apis/api';

import {
  CREATE_PRODUCT_REVIEW,
  FETCH_PRODUCT_REVIEWS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  FETCH_CATEGORIES
} from './types';

export const fetchProductReviews = (sku) => {
  return async function (dispatch) {
    const response = await api.get(`/${sku}/reviews`);

    dispatch({
      type: FETCH_PRODUCT_REVIEWS,
      payload: response.data
    });
  };
};

export const createProductReview = (formValues, token, sku) => {
  return async function (dispatch) {
    const response = await api.post(`/${sku}/reviews`, formValues, authHeader(token));

    dispatch({
      type: CREATE_PRODUCT_REVIEW,
      payload: response.data
    });
  };
};

export const addToCart = (productId) => {
  return {
    type: ADD_TO_CART,
    payload: productId
  };
};

export const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: productId
  };
};

export const fetchCategories = () => {
  return async function (dispatch) {
    const response = await bestBuy.get('/categories?apiKey=U6193s76u8HnKmClJLZU4hRv&pageSize=30&show=name,id&format=json');

    dispatch({
      type: FETCH_CATEGORIES,
      payload: response.data.categories
    });
  };
};
