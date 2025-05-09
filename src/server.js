import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import studentRoutes from "./studentRoutes.js";

const app = express();
app.get("/test-server", (req, res) => {
  console.log("SERVER LOG: /test-server route hit!");
  res.send("Server is alive!");
});
// ✅ CORS MUST be applied before any other route or middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend
    credentials: true,
  })
);

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", studentRoutes);

// Start server
const port = 5090;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
