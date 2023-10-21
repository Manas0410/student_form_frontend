import { configureStore } from "@reduxjs/toolkit";
import studentData from "./slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const studentDataReducer = persistReducer(persistConfig, studentData);
export const store = configureStore({
  reducer: {
    studentDataReducer,
  },
});
export const persistor = persistStore(store);
