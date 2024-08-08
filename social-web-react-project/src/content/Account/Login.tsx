import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Login() {
  const [credentials, setCredentials] = useState<any>({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signin = async () => {
    try {
      const currentUser = await client.signin(credentials);
      dispatch(setCurrentUser(currentUser));
      // console.log(currentUser);
      navigate("/home");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  return (
    <div id="wd-signin-screen" className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-6">
          <img 
            src="/Images/3665917.png"
            width={100}
            height={100}
            alt="Logo"
          />
          <h1 className="text-2xl font-bold">Sign in</h1>
        </div>
        <form action="" className="space-y-4">
          {error && <div className="wd-error alert alert-danger text-red-500 text-sm mb-4">{error}</div>}
          <div>
            <label htmlFor="wd-username" className="block text-base font-medium text-gray-700 mb-2">Username</label>
            <input 
              id="wd-username" 
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              value={credentials.username} 
              className="form-control border rounded-lg h-12 bg-gray-100 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" 
              placeholder="username" 
            />
          </div>
          <div>
            <label htmlFor="wd-password" className="block text-base font-medium text-gray-700 mb-2">Password</label>
            <input 
              id="wd-password" 
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              value={credentials.password} 
              className="form-control border rounded-lg h-12 bg-gray-100 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" 
              placeholder="password" 
              type="password" 
            />
          </div>
          <button 
            id="wd-signin-btn" 
            onClick={signin} 
            className="w-full py-3 bg-blue-500 rounded-full text-white text-center cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          > 
            Sign in 
          </button>
          <button 
            id="wd-guest-btn" 
            onClick={() => navigate("/home")} 
            className="w-full py-3 bg-blue-500 rounded-full text-white text-center cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          > 
            Visit as guest
          </button>
        </form>
      </div>
    </div>
  )
}