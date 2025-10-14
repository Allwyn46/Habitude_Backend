import express, { json, urlencoded } from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Middlewares
app.use(json({ limit: "100mb" }));
app.use(urlencoded({ limit: "100mb", extended: true }));

//Routes

// Default Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is Running in port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Bankai, Senbonzakura Kageyoshi");
});
