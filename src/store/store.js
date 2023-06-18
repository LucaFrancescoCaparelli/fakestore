import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import whisListReducer from "./features/whistListSlice";
import productsReducer from "./features/productsSlice.js";

const reducer = combineReducers({
  account: authReducer,
  whishList: whisListReducer,
  products: productsReducer,
});

export const store = configureStore({
  reducer,
});
