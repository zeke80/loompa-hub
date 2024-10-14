import { configureStore } from "@reduxjs/toolkit";
import loompaListReducer from "./loompaDataSlice";

export const store = configureStore({
  reducer: {
    loompaData: loompaListReducer,
  },
});
