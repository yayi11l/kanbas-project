import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./content/Account/reducer";

const store = configureStore({
  reducer: {
    accountReducer
  },
});
export default store;