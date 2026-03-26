import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const data = await registerUser(form);
      if (data?.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data?.user?.role || "user");

        setSuccess("Account created successfully");
        setTimeout(() => navigate("/dashboard"), 900);
      } else {
        setError("Something went wrong. Please login.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:py-12">
      <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-[#101426] p-8 text-white shadow-2xl shadow-slate-300/40 sm:p-10">
        <div className="absolute right-4 top-8 h-24 w-24 rounded-full bg-cyan-300/30 blur-xl" />
        <div className="absolute -left-10 bottom-2 h-36 w-36 rounded-full bg-amber-300/30 blur-2xl" />
        <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
          New Workspace
        </p>
        <h2 className="relative mt-3 text-3xl font-extrabold leading-tight">
          Start organizing your task flow today
        </h2>
        <div className="relative mt-8 grid gap-3 text-sm">
          <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
            Secure auth and private task list
          </div>
          <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
            Interface with clear actions
          </div>
          <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
            Fast create, edit and delete loop
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-sm sm:p-10"
      >
        <p className="mb-2 inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold tracking-wide text-cyan-700">
          Create Account
        </p>
        <h1 className="text-3xl font-extrabold leading-tight text-slate-900">
          Register and get started
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          It only takes a minute to set up your account.
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Name
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-cyan-300 transition focus:ring-2"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-cyan-300 transition focus:ring-2"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-cyan-300 transition focus:ring-2"
              placeholder="Choose password"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Role
            </label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-cyan-300 transition focus:ring-2"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error && (
            <p className="text-sm font-semibold text-rose-600">{error}</p>
          )}
          {success && (
            <p className="text-sm font-semibold text-emerald-600">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </div>

        <p className="mt-5 text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-bold text-slate-900 underline decoration-cyan-400 decoration-2 underline-offset-4"
          >
            Login here
          </Link>
        </p>
      </form>
    </section>
  );
}
