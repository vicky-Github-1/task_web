import {Task} from "../models/task.js";
import asyncHandler from "../middleware/asyncHandler.js";
import ErrorHandler from "../utils/errorHandler.js";

// CREATE
export const createTask = asyncHandler(async (req, res, next) => {
  const task = await Task.create({
    title: req.body.title,
    user: req.user.id
  });

  res.status(201).json({ success: true, task });
});

// GET ALL
export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json({ success: true, tasks });
});

// UPDATE
export const updateTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new ErrorHandler("Task not found", 404));
  }

  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({ success: true, updated });
});

// DELETE
export const deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new ErrorHandler("Task not found", 404));
  }

  await task.deleteOne();

  res.json({ success: true, message: "Task deleted" });
});

// ADMIN - GET ALL
export const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().populate("user", "name email");
  
  res.json({
    success: true,
    tasks
  });
});