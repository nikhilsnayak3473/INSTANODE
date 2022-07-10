import axios from 'axios';
import { setAlert } from './alert';
import { LOGIN_SUCCESS, LOGIN_FAIL } from './types';

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(
      'http://localhost:5000/api/auth',
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg));
      });
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
export const register = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(
      'http://localhost:5000/api/auth',
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg));
      });
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
