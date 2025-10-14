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

export const login = async (req, res) => {};

export const authStatus = async (req, res) => {};
export const logout = async (req, res) => {};
export const setup2fa = async (req, res) => {};
export const verify2fa = async (req, res) => {};
export const reset2fa = async (req, res) => {};
