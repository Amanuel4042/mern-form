import express from "express";
import multer from "multer";
import { submitForm, getForms } from "../controllers/formController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

router.get("/forms", getForms);
router.post("/submit-form", upload.single("photo"), submitForm);

export default router;
