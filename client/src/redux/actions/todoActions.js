import axios from 'axios';
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
} from '@/constants/actionTypes';
const serverUrl = import.meta.env.VITE_SERVER_URL;
// Create Todo
export const createTodo = (todoData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_TODO_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    };

    const { data } = await axios.post(`${serverUrl}/api/v1/todos/create`, todoData, config);

    dispatch({ type: CREATE_TODO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_TODO_FAILURE,
      payload: error.response?.data?.message || 'Internal Server Error',
    });
  }
};

// Get User Todos
export const getUserTodos = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_TODOS_REQUEST });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(`${serverUrl}/api/v1/todos/user/${userId}`, config);

    dispatch({ type: GET_USER_TODOS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_TODOS_FAILURE,
      payload: error.response?.data?.message || 'Internal Server Error',
    });
  }
};

// Get Todo by ID
export const getTodoById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_TODO_BY_ID_REQUEST });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(`${serverUrl}/api/v1/todos/${id}`, config);

    dispatch({ type: GET_TODO_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_TODO_BY_ID_FAILURE,
      payload: error.response?.data?.message || 'Internal Server Error',
    });
  }
};

// Update Todo
export const updateTodo = (id, todoData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TODO_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    };

    const { data } = await axios.put(`${serverUrl}/api/v1/todos/update/${id}`, todoData, config);

    dispatch({ type: UPDATE_TODO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_TODO_FAILURE,
      payload: error.response?.data?.message || 'Internal Server Error',
    });
  }
};

// Delete Todo
export const deleteTodo = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TODO_REQUEST });

    const config = {
      withCredentials: true,
    };

    await axios.delete(`${serverUrl}/api/v1/todos/delete/${id}`, config);

    dispatch({ type: DELETE_TODO_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: DELETE_TODO_FAILURE,
      payload: error.response?.data?.message || 'Internal Server Error',
    });
  }
};

// Assign Todo
export const assignTodo = (projectId, todoId, assignedUserId) => async (dispatch) => {
  try {
    dispatch({ type: ASSIGN_TODO_REQUEST });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.post(`${serverUrl}/api/v1/todos/${projectId}/assign-todo`, { todoId, assignedUserId }, config);

    dispatch({ type: ASSIGN_TODO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ASSIGN_TODO_FAILURE,
      payload: error.response?.data?.message || 'Internal Server Error',
    });
  }
};

// Update Todo Review
export const updateTodoReview = (id, reviewData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TODO_REVIEW_REQUEST });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.put(`${serverUrl}/api/v1/todos/review/${id}`, reviewData, config);

    dispatch({ type: UPDATE_TODO_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_TODO_REVIEW_FAILURE,
      payload: error.response?.data?.message || 'Internal Server Error',
    });
  }
};

// Clear Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};