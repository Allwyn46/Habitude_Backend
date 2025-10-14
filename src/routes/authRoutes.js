import { Router } from "express";
import passport from "passport";
import {
  register,
  logout,
  login,
  authStatus,
  reset2fa,
  setup2fa,
  verify2fa,
} from "../controllers/authController.js";

const router = Router();

// Registration route
router.post("/register", register);
// Login route
router.post("/login", passport.authenticate("local"), login);
// Auth status route
router.get("/authstatus", authStatus);
// Logout route
router.post("/logout", logout);

//2fa setup
router.post("/2fa/setup", setup2fa);

//Verify 2fa
router.post("/2fa/verify", verify2fa);

//Reset 2fa
router.post("/2fa/reset", reset2fa);

export default router;
