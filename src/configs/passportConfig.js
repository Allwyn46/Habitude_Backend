import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import UserModel from "../models/user.js";

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      const user = await UserModel.findByUsername(username);
      if (!user) return done(null, false, { message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) return done(null, user);
      else return done(null, false, { message: "Incorrect password" });
    } catch (error) {
      return done(error);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
