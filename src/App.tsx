import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./content/Home";
import Login from "./content/Account/Login";
import store from "./store";
import { Provider } from "react-redux";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import Signup from "./content/Account/Signup";

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
            <Route path="/profile" element={<h1>Profile</h1>} />
            <Route path="/search" element={<h1>Search</h1>} />
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
}
export default App;