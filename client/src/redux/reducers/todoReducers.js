import { createReducer } from '@reduxjs/toolkit';
import {
  CREATE_TODO_REQUEST,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_FAILURE,
  GET_USER_TODOS_REQUEST,
  GET_USER_TODOS_SUCCESS,
  GET_USER_TODOS_FAILURE,
  GET_TODO_BY_ID_REQUEST,
  GET_TODO_BY_ID_SUCCESS,
  GET_TODO_BY_ID_FAILURE,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,
  ASSIGN_TODO_REQUEST,
  ASSIGN_TODO_SUCCESS,
  ASSIGN_TODO_FAILURE,
  UPDATE_TODO_REVIEW_REQUEST,
  UPDATE_TODO_REVIEW_SUCCESS,
  UPDATE_TODO_REVIEW_FAILURE,
  CLEAR_ERRORS,
} from '../../constants/actionTypes';

const initialState = {
  todos: [],
  todo: {},
  loading: false,
  error: null,
};

const todoReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(CREATE_TODO_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(CREATE_TODO_SUCCESS, (state, action) => {
      state.loading = false;
      state.todos.push(action.payload);
    })
    .addCase(CREATE_TODO_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(GET_USER_TODOS_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(GET_USER_TODOS_SUCCESS, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    })
    .addCase(GET_USER_TODOS_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(GET_TODO_BY_ID_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(GET_TODO_BY_ID_SUCCESS, (state, action) => {
      state.loading = false;
      state.todo = action.payload;
    })
    .addCase(GET_TODO_BY_ID_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(UPDATE_TODO_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(UPDATE_TODO_SUCCESS, (state, action) => {
      state.loading = false;
      state.todo = action.payload;
    })
    .addCase(UPDATE_TODO_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(DELETE_TODO_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(DELETE_TODO_SUCCESS, (state, action) => {
      state.loading = false;
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    })
    .addCase(DELETE_TODO_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(ASSIGN_TODO_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(ASSIGN_TODO_SUCCESS, (state, action) => {
      state.loading = false;
      state.todo = action.payload;
    })
    .addCase(ASSIGN_TODO_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(UPDATE_TODO_REVIEW_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(UPDATE_TODO_REVIEW_SUCCESS, (state, action) => {
      state.loading = false;
      state.todo = action.payload;
    })
    .addCase(UPDATE_TODO_REVIEW_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    });
});

export default todoReducer;