export function validateForm(data) {
  const errors = {};

  if (!data.studentName.trim()) {
    errors.studentName = "This field is required.";
  }

  const usnRegex = /^[1-9][A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{3}$/i;
  if (!data.usn.trim()) {
    errors.usn = "This field is required.";
  } else if (!usnRegex.test(data.usn)) {
    errors.usn = "Invalid USN format.";
  }

  if (!data.branch.trim()) {
    errors.branch = "This field is required.";
  }

  const semester = parseInt(data.semester);
  if (!data.semester) {
    errors.semester = "This field is required.";
  } else if (isNaN(semester) || semester < 1 || semester > 8) {
    errors.semester = "Semester must be between 1 and 8.";
  }

  const sectionRegex = /^[A-Za-z]$/;
  if (!data.section.trim()) {
    errors.section = "This field is required.";
  } else if (!sectionRegex.test(data.section)) {
    errors.section = "Section must be a single letter.";
  }

  if (!data.phoneNumber.trim()) {
    errors.phoneNumber = "This field is required.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = "This field is required.";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Invalid email address.";
  }

  const ratingFields = [
    { key: "understandingSubjects", label: "Understanding of subjects" },
    { key: "homeworkSubmission", label: "Homework submission" },
    { key: "timeManagement", label: "Time management" },
    { key: "communicationSkills", label: "Communication skills" },
    { key: "teamwork", label: "Teamwork" },
  ];

  ratingFields.forEach(({ key }) => {
    if (data[key]) {
      const val = parseInt(data[key]);
      if (isNaN(val) || val < 1 || val > 5) {
        errors[key] = "Value must be between 1 and 5.";
      }
    }
  });

  if (!data.studyMethod) {
    errors.studyMethod = "This field is required.";
  }

  return errors;
}
