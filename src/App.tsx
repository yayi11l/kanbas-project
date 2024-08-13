import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./content/Home";
import Login from "./content/Account/Login";
import store from "./store";
import { Provider } from "react-redux";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import Signup from "./content/Account/Signup";
import PostDetails from "./content/Home/Feed/Posts/PostDetails";
import SearchResults from "./content/Search";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="h-100">
          <Routes>
            <Route path="/" element={<Navigate to="home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/posts/detail/:pid" element={<PostDetails />} />
            <Route path="/profile" element={<h1>Profile</h1>} />
            <Route path="/search" element={<SearchResults />} />
            {/* <Route path="/search/:criteria" element={<SearchResults />} /> */}
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
}
export default App;