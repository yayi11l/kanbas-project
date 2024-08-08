import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./content/Account/reducer";
import postsReducer from "./content/Profile/Activity/postActs/reducer";

const store = configureStore({
  reducer: {
    accountReducer,
    postsReducer,
  },
});
export default store;