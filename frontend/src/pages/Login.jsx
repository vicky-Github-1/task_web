import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", role: "user" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const data = await loginUser(form);
      localStorage.setItem("token", data.token);
      const role = data?.user?.role || form.role;
      localStorage.setItem("role", role);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:py-12">
      <div className="rounded-3xl border border-white/70 bg-white/75 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-sm sm:p-10">
        <p className="mb-2 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold tracking-wide text-emerald-700">
          Welcome Back
        </p>
        <h1 className="text-3xl font-extrabold leading-tight text-slate-900">
          Sign in to manage your daily tasks
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Simple flow, clean dashboard, and fast task updates.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-emerald-300 transition focus:ring-2"
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
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-emerald-300 transition focus:ring-2"
              placeholder="Enter password"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Role
            </label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-emerald-300 transition focus:ring-2"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error && (
            <p className="text-sm font-semibold text-rose-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-600">
          New user?{" "}
          <Link
            to="/register"
            className="font-bold text-slate-900 underline decoration-emerald-400 decoration-2 underline-offset-4"
          >
            Create account
          </Link>
        </p>
      </div>

      <aside className="relative overflow-hidden rounded-3xl border border-white/60 bg-slate-900 p-8 text-white shadow-2xl shadow-slate-300/40 sm:p-10">
        <div className="absolute -left-16 top-8 h-32 w-32 rounded-full bg-emerald-300/30 blur-2xl" />
        <div className="absolute -right-10 bottom-6 h-40 w-40 rounded-full bg-orange-300/20 blur-2xl" />
        <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
          Productive Workspace
        </p>
        <h2 className="relative mt-3 text-3xl font-extrabold leading-tight">
          Build momentum with focused task tracking
        </h2>
        <ul className="relative mt-8 space-y-3 text-sm text-slate-200">
          <li className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
            Create tasks quickly
          </li>
          <li className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
            Update status in one click
          </li>
          <li className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
            Delete completed clutter
          </li>
        </ul>
      </aside>
    </section>
  );
}
