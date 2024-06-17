// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counter";
import Unpersisted_counterslice from "./slices/unpersisted_counter";
import User_Slice from "./slices/User_Slice.js";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  counter: counterSlice,
  Unpersisted_counter: Unpersisted_counterslice,
  User: User_Slice,
});

const persistConfig = {
  key: "root",
  storage: storageSession,
  blacklist: ["Unpersisted_counter"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

