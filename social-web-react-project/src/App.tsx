import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./content/Home";
import Profile from "./content/Profile";
import Followers from "./content/Profile/Activity/userActs/Followers";
import Following from "./content/Profile/Activity/userActs/Following";
import Reviews from "./content/Profile/Activity/postActs/Review";
import Login from "./content/Account/Login";
import store from "./store";
import { Provider } from "react-redux";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import Signup from "./content/Account/Signup";
import PostDetails from "./content/Home/Feed/Posts/PostDetails";

function App() {
  return (
    <Provider store={store}>
    <HashRouter>
      <div className="h-100">
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:uid" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/posts/detail/:pid" element={<PostDetails />} />
          <Route path="/profile/:userId/followers" element={<Followers />} />
          <Route path="/profile/:userId/following" element={<Following />} />
          <Route path="/profile/:userId/reviews" element={<Reviews />} />
          <Route path="/search" element={<h1>Search</h1>} />
        </Routes>
      </div>
    </HashRouter>
    </ Provider >
  );
}
export default App;