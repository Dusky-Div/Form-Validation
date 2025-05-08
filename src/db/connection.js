const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // or your MySQL username
  password: "new_password", // or your MySQL password
  database: "form-validation",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = db;
