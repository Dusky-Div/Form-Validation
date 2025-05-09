// src/db/db.js
import { Client } from "pg";

// Setup the database connection
const client = new Client({
  user: "postgres", // replace with your postgres username
  host: "localhost", // or your postgres server IP if not localhost
  database: "form_validation", // replace with the name of your database
  password: "new_password", // replace with your password
  port: 5432, // default port for PostgreSQL
});

// Connect to the database
client
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Connection error", err.stack));

// Export the client so we can use it elsewhere in the app
export default client;
