import { useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTasks,
  updateTask,
} from "../api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const role = localStorage.getItem("role") || "user";
  const isAdmin = role === "admin";

  const fetchTasks = async () => {
    try {
      const list = await getTasks();
      setTasks(list);
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchAllTasks = async () => {
    try {
      const list = await getAllTasks();
      setAllTasks(list);
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not fetch admin tasks");
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchAllTasks();
    }
  }, [isAdmin]);

  const addOrUpdateTask = async () => {
    if (!title.trim()) {
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      if (editingId) {
        await updateTask(editingId, { title: title.trim() });
        setMessage("Task updated successfully");
      } else {
        await createTask({ title: title.trim() });
        setMessage("Task created successfully");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Action failed");
    }

    setLoading(false);
    setTitle("");
    setEditingId("");
    fetchTasks();
    if (isAdmin) {
      fetchAllTasks();
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setMessage("Task deleted");
      fetchTasks();
      if (isAdmin) {
        fetchAllTasks();
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Delete failed");
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setTitle(task.title);
  };

  const toggleCompleted = async (task) => {
    try {
      await updateTask(task._id, { completed: !task.completed });
      fetchTasks();
      if (isAdmin) {
        fetchAllTasks();
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not update status");
    }
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  const handleCancel = () => {
    setTitle("");
    setEditingId("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  const dueText =
    completedCount === tasks.length && tasks.length > 0
      ? "All done"
      : "Keep going";

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
   {!isAdmin && ( <>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
    <article className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Total Tasks
        </p>
        <h3 className="mt-2 text-3xl font-extrabold text-slate-900">
        {tasks.length}
        </h3>
    </article>
    <article className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Completed
        </p>
        <h3 className="mt-2 text-3xl font-extrabold text-emerald-600">
        {completedCount}
        </h3>
    </article>
    <article className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Pending
        </p>
        <h3 className="mt-2 text-3xl font-extrabold text-orange-500">
        {tasks.length - completedCount}
        </h3>
    </article>
    <article className="rounded-2xl border border-white/70 bg-slate-900 p-5 text-white shadow-lg shadow-slate-300/40">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
        Status
        </p>
        <h3 className="mt-2 text-2xl font-extrabold">{dueText}</h3>
        <button
        type="button"
        onClick={handleLogout}
        className="mt-3 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-semibold transition hover:bg-white/25"
        >
        Quick Logout
        </button>
    </article>
    </div>

    <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.35fr]">
    <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">
        {editingId ? "Update Task" : "Create Task"}
        </h2>
        <p className="mt-1 text-sm text-slate-600">
        Add focused work items and keep your list clean.
        </p>

        <div className="mt-6 space-y-4">
        <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
            Task title
            </label>
            <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write your next task"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-sky-300 transition focus:ring-2"
            />
        </div>

        <div className="flex gap-2">
            <button
            type="button"
            onClick={addOrUpdateTask}
            disabled={loading}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
            {loading ? "Please wait..." : editingId ? "Update" : "Create"}
            </button>
            {editingId && (
            <button
                type="button"
                onClick={handleCancel}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
                Cancel
            </button>
            )}
        </div>

        {message && (
            <p className="text-sm font-semibold text-cyan-700">{message}</p>
        )}
        </div>
    </div>

    <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-sm">
        <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-slate-900">
            Task List
        </h2>
        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
            {tasks.length} items
        </span>
        </div>

        <div className="mt-5 space-y-3">
        {tasks.length === 0 && (
            <p className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-center text-sm font-medium text-slate-500">
            No tasks yet. Create your first one.
            </p>
        )}

        {tasks.map((task) => (
            <article
            key={task._id}
            className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
            <div>
                <p
                className={`text-base font-semibold ${task.completed ? "text-slate-400 line-through" : "text-slate-900"}`}
                >
                {task.title}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {task.completed ? "Completed" : "Pending"}
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                <button
                type="button"
                onClick={() => toggleCompleted(task)}
                className="rounded-lg bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-200"
                >
                {task.completed ? "Mark Pending" : "Mark Done"}
                </button>
                <button
                type="button"
                onClick={() => handleEdit(task)}
                className="rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-200"
                >
                Edit
                </button>
                <button
                type="button"
                onClick={() => handleDelete(task._id)}
                className="rounded-lg bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-200"
                >
                Delete
                </button>
            </div>
            </article>
        ))}
        </div>
    </div>
    </div></>)}

      {isAdmin && (
        <div className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Admin Route
            </h2>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
              /tasks/all
            </span>
          </div>
          <p className="mb-4 text-sm text-slate-600">
            You are logged in as admin. This section reads all users' tasks from
            the protected admin route.
          </p>
          <div className="space-y-2">
            {allTasks.length === 0 && (
              <p className="rounded-xl border border-dashed border-slate-300 px-4 py-4 text-sm text-slate-500">
                No tasks available in admin view.
              </p>
            )}
            {allTasks.map((task) => (
              <div
                key={task._id}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                <p className="text-sm font-semibold text-slate-900">
                  {task.title}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Owner: {task?.user?.name || "Unknown"} (
                  {task?.user?.email || "No email"})
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
