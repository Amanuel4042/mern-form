import express from "express";
import { mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import formRoutes from "./routes/formRoutes.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(mongoDBURL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.use("/api", formRoutes); // all API routes handled in formRoutes

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
