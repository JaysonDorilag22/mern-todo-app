// filepath: /c:/Desktop/Beginner Projects/mern-todo-app/client/src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from "./reducers/authReducers";
import projectReducer from "./reducers/projectReducers";
import todoReducer from "./reducers/todoReducers";

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = {
  auth: persistReducer(persistConfig, authReducer),
  userProjects: projectReducer,
  todos: todoReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };