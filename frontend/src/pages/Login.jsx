import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authServices";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] =
  useState({
    email: "",
    password: "",
  });

const [loading, setLoading] =
  useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

const handleSubmit =
  async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const data =
        await loginUser(
          formData
        );

      localStorage.removeItem(
        "indiaTourTrip"
      );

      localStorage.removeItem(
        "indiaTourTripDates"
      );

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          data.user
        )
      );

      toast.success(
        "Welcome Back!"
      );

      navigate(
        "/dashboard"
      );

    } catch (error) {

      toast.error(
        error.response?.data
          ?.message ||
          "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-300 to-blue-700 flex items-center justify-center p-6 relative overflow-hidden">

      <div className="absolute w-96 h-96 bg-orange-500/20 rounded-full blur-3xl -top-20 -left-20" />

      <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl bottom-0 right-0" />

      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-md border border-white/30 relative z-10">

        <div className="text-center mb-8">

          <h1 className="text-5xl font-black">

            <span className="text-orange-500">
              INDIA
            </span>

            <span className="text-blue-700">
              TOUR
            </span>

          </h1>

          <p className="text-slate-500 mt-3">
            Explore • Discover • Travel
          </p>

        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">
          Welcome Back
        </h2>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5"
        >

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            className="w-full border border-slate-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            className="w-full border border-slate-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />

          <button
  type="submit"
  disabled={loading}
  className={`w-full text-white py-4 rounded-xl font-semibold shadow-lg transition
  ${
    loading
      ? "bg-slate-400 cursor-not-allowed"
      : "bg-gradient-to-r from-orange-500 to-blue-600 hover:scale-[1.02]"
  }`}
>
  {loading
    ? "Signing In..."
    : "Login"}
</button>

        </form>

        <p className="text-center mt-6 text-slate-600">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-semibold text-orange-500 hover:text-orange-600"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;