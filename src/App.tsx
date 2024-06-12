import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <div className="h-100">
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="/home" element={<h1>Home</h1>} />
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/profile" element={<h1>Profile</h1>} />
          <Route path="/search" element={<h1>Search</h1>} />
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;