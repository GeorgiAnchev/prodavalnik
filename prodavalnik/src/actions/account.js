import api, { authHeader } from '../apis/api';
import history from '../reducers/history';

import {
      CREATE_ACCOUNT,
      LOGIN,
      LOGIN_ERROR,
      CLEAR_LOGIN_ERROR,
      LOGOUT,
      REGISTER_ERROR,
      CLEAR_REGISTER_ERROR
} from './types';

export const createAccount = (formValues) => {
      return async function (dispatch) {
            try {
                  const response = await api.post('/account/register', formValues);

                  dispatch({
                        type: CREATE_ACCOUNT,
                        payload: response.data
                  });
            }
            catch (error) {
                  dispatch({
                        type: REGISTER_ERROR,
                        payload: error.response.data
                  });
            }
      };
};

export const login = (formValues) => {
      return async function (dispatch) {
            try {
                  const response = await api.post(`/account/login`, formValues);
                  console.log(response);
                  if (formValues.rememberMe) {
                        localStorage.setItem('userInfo', JSON.stringify(response.data))
                  }

                  dispatch({
                        type: LOGIN,
                        payload: response.data
                  });

                  history.goBack();
            }
            catch (e) {
                  dispatch({
                        type: LOGIN_ERROR
                  });
            }
      };
};

export const clearLoginError = () => {
      return {
            type: CLEAR_LOGIN_ERROR
      };
};

export const clearRegisterError = () => {
      return {
            type: CLEAR_REGISTER_ERROR
      };
};

export const logout = (token) => {
      return async function (dispatch) {
            try {
                  localStorage.removeItem('userInfo');

                  await api.post('/account/logout', null, authHeader(token));

                  dispatch({
                        type: LOGOUT
                  });

            }
            catch (e) {
                  console.log(e);
            }
      };
};