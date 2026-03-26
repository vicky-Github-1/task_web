import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const linkClass = (to) =>
    `rounded-lg px-4 py-2 text-sm font-semibold transition ${
      location.pathname === to
        ? "bg-slate-900 text-white"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          to={token ? "/dashboard" : "/"}
          className="flex items-center gap-2"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-lg font-bold text-white">
            T
          </span>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            TaskFlow
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          {!token && (
            <>
              <Link to="/" className={linkClass("/")}>
                Login
              </Link>
              <Link to="/register" className={linkClass("/register")}>
                Register
              </Link>
            </>
          )}
          {token && (
            <>
              <Link to="/dashboard" className={linkClass("/dashboard")}>
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("role");
                  navigate("/");
                }}
                className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
