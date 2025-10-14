import bcrypt from "bcryptjs";
import UserModel from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await UserModel.create({
      username: username,
      password: hashedPassword,
      ismfaactive: false,
    });

    res.status(201).json({
      message: "User Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error Registering User",
      message: error.message,
      details: error,
    });
  }
};

export const login = async (req, res) => {
  res.status(200).json({
    message: "User Logged in Successfully",
    username: req.user.username,
    ismfaactive: req.user.ismfaactive,
  });
};

export const authStatus = async (req, res) => {
  if (req.user) {
    res.send(200).json({
      message: "User logged in",
      username: req.user.username,
      ismfaactive: req.user.ismfaactive,
    });
  } else {
    res.status(401).json({
      message: "Unauthorized User",
    });
  }
};
export const logout = async (req, res) => {
  if (!req.user)
    res.status(401).json({
      message: "Unauthorized User",
    });
  req.logout((err) => {
    if (err) res.status(400).json({ message: "User not logged in" });
    res.status(200).json({ message: "Logged out successfully" });
  });
};
export const setup2fa = async (req, res) => {};
export const verify2fa = async (req, res) => {};
export const reset2fa = async (req, res) => {};
