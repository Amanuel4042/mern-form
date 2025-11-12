import express from "express";
import { submitForm, getForms } from  "../controllers/formController.js";



const router =express.Router();

router.get("/forms",getForms);
router.post("/submit-form",submitForm);

export default router;
