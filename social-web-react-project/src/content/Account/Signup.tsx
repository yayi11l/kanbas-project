import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Signup() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    return user.username.length > 0 && user.password.length > 0 && user.password === confirmPassword;
  };

  const signup = async () => {
    if (!validateForm()) {
      setError("Please fill in all fields and make sure passwords match.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      navigate("/home");
    } catch (err : any) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="wd-signup-screen" className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-6">
          <img 
            src="/Images/3665917.png"
            width={100}
            height={100}
            alt="Logo"
          />
          <h1 className="text-2xl font-bold">Sign up</h1>
        </div>
        <form action="" className="space-y-4">
          {error && <div className="wd-error alert alert-danger text-red-500 text-sm mb-4">{error}</div>}
          <div>
            <label htmlFor="wd-username" className="block text-base font-medium text-gray-700 mb-2">Username</label>
            <input 
              id="wd-username" 
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              value={user.username} 
              className="form-control border rounded-lg h-12 bg-gray-100 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" 
              placeholder="username" 
            />
          </div>
          <div>
            <label htmlFor="wd-password" className="block text-base font-medium text-gray-700 mb-2">Password</label>
            <input 
              id="wd-password" 
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password} 
              className="form-control border rounded-lg h-12 bg-gray-100 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" 
              placeholder="password" 
              type="password" 
            />
          </div>
          <div>
            <label htmlFor="wd-confirm-password" className="block text-base font-medium text-gray-700 mb-2">Confirm Password</label>
            <input 
              id="wd-confirm-password" 
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword} 
              className="form-control border rounded-lg h-12 bg-gray-100 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" 
              placeholder="confirm password" 
              type="password" 
            />
          </div>
          <button 
            id="wd-signup-btn" 
            onClick={signup} 
            className="w-full py-3 bg-blue-500 rounded-full text-white text-center cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          > 
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <div className="mt-4 text-center">
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              Already have an account? Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
