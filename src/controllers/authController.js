import bcrypt from "bcryptjs";
import UserModel from "../models/user.js";
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import jwt from "jsonwebtoken";

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
    res.status(200).json({
      message: "User logged in",
      isloggedin: true,
      username: req.user.username,
      ismfaactive: req.user.ismfaactive,
    });
  } else {
    res.status(401).json({
      message: "Unauthorized User",
      isloggedin: false,
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

export const setup2fa = async (req, res) => {
  try {
    const user = req.user;
    let secret = speakeasy.generateSecret();
    console.log(secret);
    await UserModel.update(user.id, {
      twofactorsecret: secret.base32,
      ismfaactive: true,
    });

    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `${req.user.username}`,
      issuer: "Habitude",
      encoding: "base32",
    });

    const qrImageUrl = await qrCode.toDataURL(url);

    res.status(200).json({
      messae: "2FA setup completed",
      qrcode: qrImageUrl,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error Settig Up 2FA",
      message: error.message,
      details: error,
    });
  }
};
export const verify2fa = async (req, res) => {
  const { token } = req.body;
  const user = req.user;

  const verified = speakeasy.totp.verify({
    secret: user.twofactorsecret,
    encoding: "base32",
    token: token,
  });

  if (verified) {
    const jwtToken = jwt.sign(
      {
        username: user.username,
      },
      process.env.JWTSECRET,
      {
        expiresIn: "1hr",
      },
    );

    res.status(200).json({
      messae: "2FA successful",
      token: jwtToken,
    });
  } else {
    res.status(400).json({
      message: "Invalid 2FA Token",
    });
  }
};
export const reset2fa = async (req, res) => {
  try {
    const user = req.user;

    await UserModel.update(user.id, {
      ismfaactive: false,
      twofactorsecret: "",
    });

    res.status(200).json({
      message: "2FA reset successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to reset 2FA",
      error: error,
    });
  }
};
