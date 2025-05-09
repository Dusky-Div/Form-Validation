import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
app.get("/test-server", (req, res) => {
  console.log("SERVER LOG: /test-server route hit!");
  res.send("Server is alive!");
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use("/api", studentRoutes);

const port = 5090;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
