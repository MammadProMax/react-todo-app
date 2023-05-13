import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import todoListSlice from "./slices/todoSlice";

const persistConfig = {
  key: "todos",
  storage,
};

const persistedReducer = persistReducer(persistConfig, todoListSlice);

const store = configureStore({
  reducer: {
    todoList: persistedReducer,
  },
  middleware: [],
});

const persistor = persistStore(store);

export { store, persistor };
