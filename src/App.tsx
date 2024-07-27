import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./content/Home";
import Login from "./content/Login";

function App() {
  return (
    <HashRouter>
      <div className="h-100">
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<h1>Profile</h1>} />
          <Route path="/search" element={<h1>Search</h1>} />
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;