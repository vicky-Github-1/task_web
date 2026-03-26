import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";
import ErrorHandler from "../utils/errorHandler.js";

// REGISTER
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("User already exists", 400));
  }

  if (role && !["user", "admin"].includes(role)) {
    return next(new ErrorHandler("Invalid role selected", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "user",
  });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.status(201).json({
    success: true,
    message: "User registered",
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// LOGIN
export const login = asyncHandler(async (req, res, next) => {
  const { email, password, role } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  if (role && user.role !== role) {
    return next(
      new ErrorHandler("Selected role does not match this account", 403),
    );
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
