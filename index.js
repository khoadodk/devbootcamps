const express = require("express");
const morgan = require("morgan");
require("./config/db")();

const bootcamps = require("./routes/bootcamps");

const app = express();
// Routes
app.use("/api/v1/bootcamps", bootcamps);

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port:`, PORT));
