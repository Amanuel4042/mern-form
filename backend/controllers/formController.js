import { Form } from "../models/formModel.js";

export const submitForm = async (req, res) => {
  const { name, email, gender, interests, date, color, age, message } = req.body;

  if (!name || !email || !gender || !date || !color || !age || !message || !req.file) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newForm = new Form({
      name,
      email,
      gender,
      interests: Array.isArray(interests) ? interests : [interests],
      date,
      color,
      age,
      message,
      photoURL: req.file.path
    });

    await newForm.save();
    res.status(200).json({ message: "submitted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "error" });
  }
};

export const getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "error" });
  }
};
