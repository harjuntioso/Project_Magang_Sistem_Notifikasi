import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useRef } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useState } from "react";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setUser, setToken } = useAuth();
  const [message, setMessage] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message);
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <form onSubmit={onSubmit} className="space-y-6">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Login into your account
          </h1>

          {message && (
            <div className="p-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
              <p>{message}</p>
            </div>
          )}

          <div>
            <input
              ref={emailRef}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
          <p className="text-sm text-center text-gray-600">
            Not registered?{" "}
            <Link
              to="/signup"
              className="text-blue-500 hover:underline focus:outline-none"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
