import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (payload) => {
  const { data } = await API.post("/auth/login", payload);
  return data;
};

export const registerUser = async (payload) => {
  const { data } = await API.post("/auth/register", payload);
  return data;
};

export const getTasks = async () => {
  const { data } = await API.get("/tasks");
  return data.tasks || [];
};

export const createTask = async (payload) => {
  const { data } = await API.post("/tasks", payload);
  return data.task;
};

export const updateTask = async (id, payload) => {
  const { data } = await API.put(`/tasks/${id}`, payload);
  return data.updated;
};

export const deleteTask = async (id) => {
  const { data } = await API.delete(`/tasks/${id}`);
  return data;
};

export const getAllTasks = async () => {
  const { data } = await API.get("/tasks/all");
  return data.tasks || [];
};
