import api from '../apis/api';

import {
      FETCH_PRODUCT_DETAILS,
      FETCH_TRENDING_PRODUCTS,
      FETCH_TOP_DAILY_DEALS,
      FETCH_SEARCH_RESULTS,
      FETCH_LIST_OF_PRODUCTS
} from './types';

export const fetchTopDailyDeals = () => {
      return async function (dispatch) {
            const response = await api.get('/topDailyDeals');

            dispatch({
                  type: FETCH_TOP_DAILY_DEALS,
                  payload: response.data
            });
      };
};

export const fetchTrendingProducts = () => {
      return async function (dispatch) {
            const response = await api.get(`/trendingProducts`);

            dispatch({
                  type: FETCH_TRENDING_PRODUCTS,
                  payload: response.data
            });
      };
};

export const fetchProductDetails = (sku) => {
      return async function (dispatch) {
            const response = await api.get(`/product/${sku}`);

            dispatch({
                  type: FETCH_PRODUCT_DETAILS,
                  payload: response.data
            });
      };
};

export const fetchListOfProducts = (ids) => {
      return async function (dispatch) {
            const mergedIds = ids.join(',');
            const response = await api.get(`/products/${mergedIds}`);

            dispatch({
                  type: FETCH_LIST_OF_PRODUCTS,
                  payload: response.data
            })
      };
};

export const fetchSearchResults = (searchTerm, page = 1, filter = '') => {
      //todo test if the filter param is fine once the faceting is working 
      return async function (dispatch) {
            const response = await api.get(`/searchProducts?search=${searchTerm}&page=${page}&filter=${filter}`)
            dispatch({
                  type: FETCH_SEARCH_RESULTS,
                  payload: response.data
            });
      };
};
