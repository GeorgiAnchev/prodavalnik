import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
    CREATE_PRODUCT_REVIEW,
    FETCH_PRODUCT_REVIEWS,
    FETCH_PRODUCT_DETAILS,
    FETCH_TRENDING_PRODUCTS,
    FETCH_TOP_DAILY_DEALS,
    FETCH_CATEGORIES,
    CREATE_ACCOUNT,
    LOGIN,
    LOGIN_ERROR,
    CLEAR_LOGIN_ERROR,
    LOGOUT,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    FETCH_LIST_OF_PRODUCTS,
    FETCH_SEARCH_RESULTS,
    REGISTER_ERROR,
    CLEAR_REGISTER_ERROR
} from '../actions/types';

const cartReducer = (cart = { ids: [], productList: [] }, action) => {
    if (action.type === ADD_TO_CART) {
        return { ...cart, ids: [...cart.ids, action.payload] };
    }

    if (action.type === REMOVE_FROM_CART) {
        const filteredIds = cart.ids.filter(id => id !== action.payload);
        return { ...cart, ids: filteredIds };
    }

    if (action.type === FETCH_LIST_OF_PRODUCTS) {
        return {
            ...cart, productList: action.payload
        };
    }
    return cart;
}

//todo split redurces in different files
//todo from Siderov: make this with default state, it should be stored in values outside of the reducer function, and define every value explicitly, like loggedIn: false
// const defaultState = () => {
//     return  {
//     account: action.payload.account,
//     token: action.payload.token,
//     isSignedIn: true,
//     isRegistrationSuccessful: true
// }
// }

const accountReducer = (userInfo = {}, action) => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (storedUserInfo) {
        userInfo = storedUserInfo;
        userInfo.isSignedIn = true;
    }

    if (action.type === CREATE_ACCOUNT) {
        const loggedIn = {
            account: action.payload.account,
            token: action.payload.token,
            isSignedIn: true,
            isRegistrationSuccessful: true
        }
        return loggedIn;
    }

    if (action.type === LOGIN) {
        const loggedIn = {
            account: action.payload.account,
            token: action.payload.token,
            isSignedIn: true
        }
        return loggedIn;
    }

    if (action.type === LOGOUT || action.type === CLEAR_LOGIN_ERROR || action.type === CLEAR_REGISTER_ERROR) {
        return {};
    }

    if (action.type === LOGIN_ERROR) {
        const logginError = {
            loginErrorOccured: true
        }
        return logginError;
    }

    if (action.type === REGISTER_ERROR) {
        const registerError = {
            registerErrorOccured: true,
            registerErrorMessage: action.payload
        }
        return registerError;
    }

    return userInfo;
}

const sideBarReducer = (sideBar = [], action) => {
    if (action.type === FETCH_CATEGORIES) {
        return action.payload;
    }
    return sideBar;
};

const topDailyDealsReducer = (topDailyDeals = [], action) => {
    if (action.type === FETCH_TOP_DAILY_DEALS) {
        return action.payload;
    }
    return topDailyDeals;
};

const topTrendingProductsReducer = (topTrendingProducts = [], action) => {
    if (action.type === FETCH_TRENDING_PRODUCTS) {
        return action.payload;
    }
    return topTrendingProducts;
};

const productDetailsReducer = (productDetails = {}, action) => {
    if (action.type === FETCH_PRODUCT_DETAILS) {
        return action.payload;
    }
    return productDetails;
};

const productReviewsReducer = (productReviews = [], action) => {
    if (action.type === FETCH_PRODUCT_REVIEWS) {
        return action.payload;
    }
    if (action.type === CREATE_PRODUCT_REVIEW) {
        return [...productReviews, action.payload];
    }
    return productReviews;
};

const searchResultsReducer = (searchResuts = [], action) => {
    if (action.type === FETCH_SEARCH_RESULTS) {
        return action.payload;
    }
    return searchResuts;
};

export default combineReducers({
    cart: cartReducer,
    userInfo: accountReducer,
    categories: sideBarReducer,
    topDailyDeals: topDailyDealsReducer,
    topTrendingProducts: topTrendingProductsReducer,
    productDetails: productDetailsReducer,
    productReviews: productReviewsReducer,
    searchResults: searchResultsReducer,
    form: formReducer
});