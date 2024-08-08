import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./content/pages/Home";
import Profile from "./content/pages/Profile";
import Followers from "./content/pages/Profile/Activity/userActs/Followers";
import Following from "./content/pages/Profile/Activity/userActs/Following";
import Reviews from "./content/pages/Profile/Activity/postActs/Review";

function App() {
  return (
    <HashRouter>
      <div className="h-100">
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile" element={<Followers />} />
          <Route path="/profile" element={<Following />} />
          <Route path="/profile" element={<Reviews />} />
          <Route path="/search" element={<h1>Search</h1>} />
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;