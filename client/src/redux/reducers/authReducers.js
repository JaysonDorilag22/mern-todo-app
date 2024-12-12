// filepath: /c:/Desktop/Beginner Projects/mern-todo-app/client/src/redux/reducers/authReducer.js
import { createReducer } from '@reduxjs/toolkit';
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
} from '../../constants/actionTypes';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(SIGN_IN_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(SIGN_IN_SUCCESS, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(SIGN_IN_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(SIGN_UP_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(SIGN_UP_SUCCESS, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(SIGN_UP_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(LOG_OUT_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(LOG_OUT_SUCCESS, (state) => {
      state.loading = false;
      state.user = null;
    })
    .addCase(LOG_OUT_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default authReducer;