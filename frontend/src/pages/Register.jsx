import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  registerUser,
} from "../services/authServices";

import toast from "react-hot-toast";

function Register() {
  const navigate =
    useNavigate();

  const [formData, setFormData] =
  useState({
    name: "",
    email: "",
    password: "",
    age: "",
    nationality: "",
    interests: "",
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

      await registerUser(
  formData
);

      toast.success(
        "Registration Successful"
      );

      navigate("/");

    } catch (error) {

      toast.error(
        error.response?.data
          ?.message ||
          "Registration Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-300 to-blue-700 flex items-center justify-center p-6 relative overflow-hidden">

      <div className="absolute w-96 h-96 bg-orange-500/20 rounded-full blur-3xl -top-20 -left-20" />

      <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl bottom-0 right-0" />

      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-xl border border-white/30 relative z-10">

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
            Create Your Travel Account
          </p>

        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >

          <input
            name="name"
            placeholder="Full Name"
            value={
              formData.name
            }
            onChange={
              handleChange
            }
            className="w-full border border-slate-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />

          <input
            name="email"
            type="email"
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
            name="password"
            type="password"
            placeholder="Password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            className="w-full border border-slate-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />

          <div className="grid md:grid-cols-2 gap-4">

            <input
              name="age"
              placeholder="Age"
              value={
                formData.age
              }
              onChange={
                handleChange
              }
              className="border border-slate-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />

            <input
              name="nationality"
              placeholder="Nationality"
              value={
                formData.nationality
              }
              onChange={
                handleChange
              }
              className="border border-slate-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />

          </div>

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
    ? "Creating Account..."
    : "Create Account"}
</button>

        </form>

        <p className="text-center mt-6 text-slate-600">

          Already have an account?{" "}

          <Link
            to="/"
            className="font-semibold text-orange-500 hover:text-orange-600"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;