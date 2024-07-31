import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./content/pages/Home";
import Profile from "./content/pages/Profile";

function App() {
  return (
    <HashRouter>
      <div className="h-100">
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<h1>Search</h1>} />
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;