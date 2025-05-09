import express from "express";
import client from "../db/connection.js";
const router = express.Router();

router.post("/students", async (req, res) => {
  const {
    studentName,
    usn,
    branch,
    semester,
    section,
    phoneNumber,
    email,
    understandingSubjects,
    homeworkSubmission,
    academicComments,
    studyMethod,
    timeManagement,
    communicationSkills,
    teamwork,
  } = req.body;

  try {
    const result = await client.query(
      "INSERT INTO student_evaluations (student_name, usn, branch, semester, section, phone_number, email, understanding_subjects, homework_submission, academic_comments, study_method, time_management, communication_skills, teamwork) " +
        "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *",
      [
        studentName,
        usn,
        branch,
        semester,
        section,
        phoneNumber,
        email,
        understandingSubjects,
        homeworkSubmission,
        academicComments,
        studyMethod,
        timeManagement,
        communicationSkills,
        teamwork,
      ]
    );

    res.status(201).json({
      message: "Student data saved successfully!",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).json({ error: "Failed to save student data" });
  }
});

export default router;
