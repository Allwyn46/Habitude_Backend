import express, { json, urlencoded } from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./configs/dbConnect.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
dbConnect();

const app = express();

// Middlewares
const corsOptions = {
  origin: [process.env.FRONTEND],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(json({ limit: "100mb" }));
app.use(urlencoded({ limit: "100mb", extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/auth", authRoutes);
// Default Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is Running in port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Bankai, Senbonzakura Kageyoshi");
});
