import axios from 'axios';
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
} from "../../constants/actionTypes";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const signIn = (credentials) => async (dispatch) => {
    dispatch({ type: SIGN_IN_REQUEST });
    try {
      const response = await axios.post(`${serverUrl}/api/v1/auth/signin`, credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch({ type: SIGN_IN_SUCCESS, payload: response.data });
      console.log('Sign In Response:', response.data);
      return response.data; 
    } catch (error) {
      dispatch({ type: SIGN_IN_FAILURE, payload: error.response.data.message });
      throw new Error(error.response.data.message); 
    }
  };

  export const signUp = (formData) => async (dispatch) => {
    dispatch({ type: SIGN_UP_REQUEST });
    try {
      const response = await axios.post(`${serverUrl}/api/v1/auth/signup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch({ type: SIGN_UP_SUCCESS, payload: response.data });
      console.log('Sign Up Response:', response.data);
      return response.data; // Ensure response data is returned
    } catch (error) {
      dispatch({ type: SIGN_UP_FAILURE, payload: error.response.data.message });
      console.log(error)
      throw new Error(error.response.data.message); // Ensure error is thrown
    }
  };

export const logOut = () => async (dispatch) => {
  dispatch({ type: LOG_OUT_REQUEST });
  try {
    await axios.post(`${serverUrl}/api/v1/auth/logout`);
    dispatch({ type: LOG_OUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOG_OUT_FAILURE, payload: error.response.data.message });
  }
};