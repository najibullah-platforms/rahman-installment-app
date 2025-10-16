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
      const res = await axios.post("https://fazalinstallmentapi-emhnbrvu.b4a.run/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-96 border border-gray-200 transition-all hover:shadow-blue-200"
      >
        {/* Title */}
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700 tracking-wide">
          Fazal <span className="text-gray-800">Qist</span>
        </h2>

        {/* Error message */}
        {error && (
          <p className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded-md border border-red-200 text-center">
            {error}
          </p>
        )}

        {/* Email Input */}
        <div className="mb-5">
          <label className="block text-gray-600 mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-3 w-full rounded-lg transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-3 w-full rounded-lg transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-3 rounded-lg shadow-md transition-all hover:shadow-blue-300"
        >
          Login
        </button>

        {/* Footer / Hint */}
        <p className="text-center text-gray-500 text-sm mt-5">
          © {new Date().getFullYear()} Fazal Electric
        </p>
      </form>
    </div>
  );
}
