import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./content/Home";
import Profile from "./content/Profile";
import Followers from "./content/Profile/Activity/userActs/Followers";
import Following from "./content/Profile/Activity/userActs/Following";
import Login from "./content/Account/Login";
import store from "./store";
import { Provider } from "react-redux";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import Signup from "./content/Account/Signup";
import PostDetails from "./content/Home/Feed/Posts/PostDetails";
import SearchResults from "./content/Search";
import Session from "./content/Account/Session";


function App() {
  return (
    <Provider store={store}>
    <Session>
    <HashRouter>
      <div className="h-100">
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:uid" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/posts/detail/:pid" element={<ProtectedRoute><PostDetails /></ProtectedRoute>} />
          <Route path="/profile/:userId/followers" element={<ProtectedRoute><Followers /></ProtectedRoute>} />
          <Route path="/profile/:userId/following" element={<ProtectedRoute><Following /></ProtectedRoute>} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
    </HashRouter>
    </Session>
    </ Provider >
  );
}
export default App;