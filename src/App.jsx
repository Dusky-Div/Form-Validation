import { useState } from "react";
import { validateForm } from "./utils/validators";

function App() {
  const [formData, setFormData] = useState({
    studentName: "",
    usn: "",
    branch: "",
    semester: "",
    section: "",
    phoneNumber: "",
    email: "",
    understandingSubjects: "",
    homeworkSubmission: "",
    academicComments: "",
    studyMethod: "",
    timeManagement: "",
    communicationSkills: "",
    teamwork: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting normally

    // Validate the form data
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    // If there are validation errors, prevent form submission
    if (Object.keys(validationErrors).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    try {
      const response = await fetch("http://localhost:5090/api/students", {
        // Correct backend URL (port 5000)
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        alert("Student data saved successfully!");
      } else {
        alert(`Error: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      alert("Error saving data");
    }
  };

  const renderInput = (label, name, type = "text", props = {}) => (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <p className="px-2 font-semibold">{label}</p>
        {errors[name] && (
          <p className="px-2 text-[#df1919] text-sm font-regular">
            {errors[name]}
          </p>
        )}
      </div>
      <input
        name={name}
        type={type}
        placeholder={label}
        value={formData[name]}
        onChange={handleChange}
        className="input border border-gray-600 rounded-md p-2"
        {...props}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-400">
          Student Self-Evaluation Form
        </h1>

        <h2 className="text-xl font-semibold mb-4 text-blue-300">
          1. Basic Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderInput("Student Name", "studentName")}
          {renderInput("USN", "usn")}
          {renderInput("Branch", "branch")}
          {renderInput("Semester", "semester", "number")}
          {renderInput("Section", "section")}
          {renderInput("Phone Number", "phoneNumber", "tel")}
          {renderInput("Email ID", "email", "email")}
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-blue-300">
          2. Academics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderInput(
            "Understanding of subjects (1–5)",
            "understandingSubjects",
            "number",
            { min: 1, max: 5 }
          )}
          {renderInput(
            "Homework submission (1–5)",
            "homeworkSubmission",
            "number",
            { min: 1, max: 5 }
          )}
        </div>
        <div className="flex flex-col mt-4">
          <div className="flex justify-between">
            <p className="px-2 font-semibold">
              Comments on academic performance
            </p>
          </div>
          <textarea
            name="academicComments"
            placeholder="Comments on academic performance"
            value={formData.academicComments}
            onChange={handleChange}
            className="input border border-gray-600 rounded-md p-2"
            rows={4}
          />
        </div>
        <div className="flex flex-col mt-4">
          <div className="flex justify-between">
            <p className="px-2 font-semibold">Preferred Study Method</p>
            {errors.studyMethod && (
              <p className="px-2 text-red-500 text-sm font-light">
                {errors.studyMethod}
              </p>
            )}
          </div>
          <select
            name="studyMethod"
            value={formData.studyMethod}
            onChange={handleChange}
            className="input border border-gray-600 rounded-md p-2"
          >
            <option value="">Select Method</option>
            <option value="Reading">Reading</option>
            <option value="Group Study">Group Study</option>
            <option value="Watching Videos">Watching Videos</option>
            <option value="Practicing Problems">Practicing Problems</option>
          </select>
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-blue-300">
          3. Personal Skills & Development
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderInput("Time Management (1–5)", "timeManagement", "number", {
            min: 1,
            max: 5,
          })}
          {renderInput(
            "Communication Skills (1–5)",
            "communicationSkills",
            "number",
            {
              min: 1,
              max: 5,
            }
          )}
          {renderInput("Teamwork Ability (1–5)", "teamwork", "number", {
            min: 1,
            max: 5,
          })}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Submit
        </button>
      </div>

      <style>
        {`
          .input {
            @apply w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500;
          }
        `}
      </style>
    </div>
  );
}

export default App;
