import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./src/content/pages/Profile/Activity/postActs/reducer";

const store = configureStore({
  reducer: {
    postsReducer,
  },
});
export default store;