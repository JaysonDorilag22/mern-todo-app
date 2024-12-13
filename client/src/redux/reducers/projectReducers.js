import { createReducer } from '@reduxjs/toolkit';
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
} from '../../constants/actionTypes';

const initialState = {
  projects: {
    joinedProjects: [],
    createdProjects: [],
  },
  loading: false,
  error: null,
};

const projectReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(CREATE_PROJECT_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(CREATE_PROJECT_SUCCESS, (state, action) => {
      state.loading = false;
      state.projects.createdProjects.push(action.payload);
    })
    .addCase(CREATE_PROJECT_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(JOIN_PROJECT_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(JOIN_PROJECT_SUCCESS, (state, action) => {
      state.loading = false;
      state.projects.joinedProjects.push(action.payload);
    })
    .addCase(JOIN_PROJECT_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(EDIT_PROJECT_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(EDIT_PROJECT_SUCCESS, (state, action) => {
      state.loading = false;
      const index = state.projects.createdProjects.findIndex(project => project._id === action.payload._id);
      if (index !== -1) {
        state.projects.createdProjects[index] = action.payload;
      }
    })
    .addCase(EDIT_PROJECT_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(DELETE_PROJECT_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(DELETE_PROJECT_SUCCESS, (state, action) => {
      state.loading = false;
      state.projects.createdProjects = state.projects.createdProjects.filter(project => project._id !== action.payload);
    })
    .addCase(DELETE_PROJECT_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(REMOVE_USER_FROM_PROJECT_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(REMOVE_USER_FROM_PROJECT_SUCCESS, (state, action) => {
      state.loading = false;
      const project = state.projects.createdProjects.find(project => project._id === action.payload.projectId);
      if (project) {
        project.invitedUsers = project.invitedUsers.filter(userId => userId !== action.payload.userId);
      }
    })
    .addCase(REMOVE_USER_FROM_PROJECT_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(GET_USER_PROJECTS_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(GET_USER_PROJECTS_SUCCESS, (state, action) => {
      state.loading = false;
      state.projects = action.payload;
    })
    .addCase(GET_USER_PROJECTS_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default projectReducer;