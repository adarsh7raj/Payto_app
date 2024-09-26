const express = require("express");
const cors = require("cors");
const app = express();
const mainrouter = require("./routes/index.js");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", mainrouter);

// Set port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});
