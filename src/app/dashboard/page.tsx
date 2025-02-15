"use client";

import React, { useState } from "react";
import Card from "../components/Card";

const ProfilePage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "Joe",
    gender: "Male",
    ielts: "",
    pte: "",
    toefl: "",
    degree: "",
    country: "",
    city: "",
    about: "",
    profession: "",
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="min-h-screen  text-white p-10">
      <div className="max-w-6xl mx-auto grid grid-cols-10 gap-6">
        {/* Left Sidebar with Profile & Form */}
        <div className="col-span-3  p-6 rounded-lg flex flex-col items-center">
          {/* Image Upload */}
          <label className="cursor-pointer">
            <div className="w-32 h-32 rounded-full overflow-hidden  flex items-center justify-center">
              {image ? (
                <img src={image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400">Upload Image</span>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="mt-6 w-full space-y-4">
            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-2 rounded-md focus:outline-none"
            />

            {/* Gender */}
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-2 rounded-md focus:outline-none"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            {/* IELTS Score */}
            <input
              type="number"
              name="ielts"
              placeholder="IELTS Score"
              value={formData.ielts}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-2 rounded-md focus:outline-none"
            />

            {/* PTE Score */}
            <input
              type="number"
              name="pte"
              placeholder="PTE Score"
              value={formData.pte}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-2 rounded-md focus:outline-none"
            />

            {/* TOEFL Score */}
            <input
              type="number"
              name="toefl"
              placeholder="TOEFL Score"
              value={formData.toefl}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-2 rounded-md focus:outline-none"
            />

            {/* Degree */}
            <input
              type="text"
              name="degree"
              placeholder="Your Degree"
              value={formData.degree}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-2 rounded-md focus:outline-none"
            />

            {/* Country */}
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-2 rounded-md focus:outline-none"
            />

            {/* City */}
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-2 rounded-md focus:outline-none"
            />

            {/* About Me */}
            <textarea
              name="about"
              placeholder="Tell us about yourself..."
              value={formData.about}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-2 rounded-md focus:outline-none"
            />

            {/* Profession */}
            <input
              type="text"
              name="profession"
              placeholder="Your Profession"
              value={formData.profession}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-2 rounded-md focus:outline-none"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right Content Area */}
        <div className="col-span-7  p-6 rounded-lg">
          <h1 className="text-4xl font-bold">Hi there! I'm {formData.name} 👋</h1>
          <p className="mt-2 text-lg">🌍 <strong>{formData.country}</strong>, {formData.city}</p>
          <p className="mt-2 text-lg">🎓 {formData.degree}</p>
          <p className="mt-2 text-lg">📝 IELTS: {formData.ielts} | PTE: {formData.pte} | TOEFL: {formData.toefl}</p>
          <p className="mt-2 text-lg">💼 {formData.profession}</p>
          <p className="mt-2 text-lg">📖 {formData.about}</p>
          <img
            src={`https://readme-typing-svg.demolab.com?font=Comfortaa&size=40&pause=500&color=00FFFF&center=true&vCenter=true&multiline=true&width=1000&height=100&lines=${encodeURIComponent(formData.profession)}`}
            alt="Typing SVG"
            className="mt-4"
          />
          <div className="mt-4">
            <h2 className="text-2xl font-bold">Interested Universities</h2>
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
