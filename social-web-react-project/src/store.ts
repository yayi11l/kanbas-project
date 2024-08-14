import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./content/Account/reducer";
import postsReducer from "./content/Profile/Activity/postActs/reducer";
import profileReducer from "./content/Profile/reducer";

const store = configureStore({
  reducer: {
    accountReducer,
    postsReducer,
    profileReducer,
  },
});
export default store;