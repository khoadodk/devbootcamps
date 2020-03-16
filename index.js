const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const fileUpload = require("express-fileupload");

require("./config/db")();
const errorHandler = require("./middlewares/error");

const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");

const app = express();

// Set Static folder
app.use(express.static(path.join(__dirname, "public")));

// ----------ORDER MATTERS----------
// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());

// Routes
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port:`, PORT));
