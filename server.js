const express = require("express");
const path = require("path");
require("dotenv").config({ quiet: true });
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./Config/dbConection");
const port = process.env.PORT || 5000;

// This file is the main starting point of the backend project.
const app = express();

// This middleware lets Express read JSON data from the request body.
app.use(express.json());

// This serves the simple frontend from the public folder.
app.use(express.static(path.join(__dirname, "public")));

// All contact routes start with /api/contacts.
app.use("/api/contacts", require("./routes/contactRoutes"));

// This middleware handles errors from the routes and controllers.
app.use(errorHandler);

// Connect to MongoDB first, then start the Express server.
connectDB().then(() => {
  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  // This shows a clear message if the port is already used.
  server.on("error", (err) => {
    console.error(`Server failed to start: ${err.message}`);
    process.exit(1);
  });
});
