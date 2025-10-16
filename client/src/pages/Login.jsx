import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://fazalinstallmentapi-emhnbrvu.b4a.run/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-white to-emerald-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl p-8 sm:p-10 w-full max-w-md transition-all duration-300 hover:shadow-emerald-200"
      >
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-emerald-600">
          Rahman <span className="text-gray-800">Qist</span>
        </h2>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-sm mb-4 bg-red-50 p-2 rounded-md border border-red-200 text-center animate-pulse">
            {error}
          </p>
        )}

        {/* Email Input */}
        <div className="mb-5">
          <label className="block text-gray-600 mb-1 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none p-3 w-full rounded-lg text-gray-800 placeholder-gray-400 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-1 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none p-3 w-full rounded-lg text-gray-800 placeholder-gray-400 transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold w-full py-3 rounded-lg shadow-md transition-all duration-300 hover:shadow-emerald-300 active:scale-95"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs sm:text-sm mt-6">
          © {new Date().getFullYear()} Rahman Electric
        </p>
      </form>
    </div>
  );
}
