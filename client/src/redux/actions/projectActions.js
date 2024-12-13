import axios from 'axios';
import {
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  JOIN_PROJECT_REQUEST,
  JOIN_PROJECT_SUCCESS,
  JOIN_PROJECT_FAILURE,
  EDIT_PROJECT_REQUEST,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  REMOVE_USER_FROM_PROJECT_REQUEST,
  REMOVE_USER_FROM_PROJECT_SUCCESS,
  REMOVE_USER_FROM_PROJECT_FAILURE,
  GET_USER_PROJECTS_REQUEST,
  GET_USER_PROJECTS_SUCCESS,
  GET_USER_PROJECTS_FAILURE,
} from "../../constants/actionTypes";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const createProject = (projectData) => async (dispatch) => {
  dispatch({ type: CREATE_PROJECT_REQUEST });
  try {
    const response = await axios.post(`${serverUrl}/api/v1/projects/create`, projectData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true, // Include credentials (cookies) in the request
    });
    dispatch({ type: CREATE_PROJECT_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: CREATE_PROJECT_FAILURE, payload: error.response.data.message });
    throw new Error(error.response.data.message);
  }
};

// Similarly, update other actions to include credentials in the request

export const joinProject = (referralData) => async (dispatch) => {
  dispatch({ type: JOIN_PROJECT_REQUEST });
  try {
    const response = await axios.post(`${serverUrl}/api/v1/projects/join`, referralData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Include credentials (cookies) in the request
    });
    dispatch({ type: JOIN_PROJECT_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: JOIN_PROJECT_FAILURE, payload: error.response.data.message });
    throw new Error(error.response.data.message);
  }
};

export const editProject = (id, projectData) => async (dispatch) => {
  dispatch({ type: EDIT_PROJECT_REQUEST });
  try {
    const response = await axios.put(`${serverUrl}/api/v1/projects/edit/${id}`, projectData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true, // Include credentials (cookies) in the request
    });
    dispatch({ type: EDIT_PROJECT_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: EDIT_PROJECT_FAILURE, payload: error.response.data.message });
    throw new Error(error.response.data.message);
  }
};

export const deleteProject = (id) => async (dispatch) => {
  dispatch({ type: DELETE_PROJECT_REQUEST });
  try {
    await axios.delete(`${serverUrl}/api/v1/projects/${id}`, {
      withCredentials: true, // Include credentials (cookies) in the request
    });
    dispatch({ type: DELETE_PROJECT_SUCCESS });
  } catch (error) {
    dispatch({ type: DELETE_PROJECT_FAILURE, payload: error.response.data.message });
    throw new Error(error.response.data.message);
  }
};

export const removeUserFromProject = (projectId, userId) => async (dispatch) => {
  dispatch({ type: REMOVE_USER_FROM_PROJECT_REQUEST });
  try {
    const response = await axios.post(`${serverUrl}/api/v1/projects/removeUser`, { projectId, userId }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Include credentials (cookies) in the request
    });
    dispatch({ type: REMOVE_USER_FROM_PROJECT_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: REMOVE_USER_FROM_PROJECT_FAILURE, payload: error.response.data.message });
    throw new Error(error.response.data.message);
  }
};

export const getUserProjects = (userId) => async (dispatch) => {
  dispatch({ type: GET_USER_PROJECTS_REQUEST });
  try {
    const response = await axios.get(`${serverUrl}/api/v1/projects/user/${userId}`, {
      withCredentials: true, // Include credentials (cookies) in the request
    });
    dispatch({ type: GET_USER_PROJECTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_USER_PROJECTS_FAILURE, payload: error.response.data.message });
    throw new Error(error.response.data.message);
  }
};