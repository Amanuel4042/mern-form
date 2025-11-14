"use client";

import { useState, ChangeEvent, FormEvent } from "react";

interface FormDataType {
  name: string;
  email: string;
  gender: string;
  interests: string[];
  date: string;
  color: string;
  age: string;
  message: string;
  photo: File | null;
}

export default function Home() {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    gender: "",
    interests: [],
    date: "",
    color: "#000000",
    age: "",
    message: "",
    photo: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;

    if (type === "file" && files) {
      setFormData((prev) => ({ ...prev, photo: files[0] }));
      return;
    }

    if (type === "checkbox") {
      setFormData((prev) => {
        const interests = checked
          ? [...prev.interests, value]
          : prev.interests.filter((i) => i !== value);
        return { ...prev, interests };
      });
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("gender", formData.gender);
    data.append("date", formData.date);
    data.append("color", formData.color);
    data.append("age", formData.age);
    data.append("message", formData.message);
    formData.interests.forEach((i) => data.append("interests", i));
    if (formData.photo) data.append("photo", formData.photo);

    try {
      const res = await fetch("http://localhost:5000/api/submit-form", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Form submitted successfully!");
        setFormData({
          name: "",
          email: "",
          gender: "",
          interests: [],
          date: "",
          color: "#000000",
          age: "",
          message: "",
          photo: null,
        });
      } else {
        alert("❌ " + (result.error || result.message));
      }
    } catch (err: any) {
      alert("⚠️ Network error: " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center">Submit Your Info</h2>

        <div>
          <label className="block font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Gender:</label>
          <div className="flex gap-4 mt-1">
            {["male", "female"].map((g) => (
              <label key={g}>
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={handleChange}
                  className="mr-1"
                />
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium">Interests:</label>
          <div className="flex gap-4 mt-1">
            {["sports", "music", "coding"].map((interest) => (
              <label key={interest}>
                <input
                  type="checkbox"
                  name="interests"
                  value={interest}
                  checked={formData.interests.includes(interest)}
                  onChange={handleChange}
                  className="mr-1"
                />
                {interest}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Favorite Color:</label>
          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
            className="mt-1 w-16 h-10 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Message:</label>
          <textarea
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded px-3 py-2"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Upload Photo:</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
