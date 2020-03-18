const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload");
// ------Web securities------
// extract info using mongodb method
const mongoSanitize = require("express-mongo-sanitize");
//  extra security in headers
const helmet = require("helmet");
// cross site scripting
const xss = require("xss-clean");
// DDoS
const rateLimit = require("express-rate-limit");
// http params polution
const hpp = require("hpp");

require("./config/db")();
const errorHandler = require("./middlewares/error");

const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");

const app = express();

// Set Static folder
app.use(express.static(path.join(__dirname, "public")));

// ----------ORDER MATTERS----------
// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 mins
  max: 100 //limit each IPP to 100 # of request per windowMs
});
app.use(limiter);
app.use(hpp());
app.use(cors());

// Routes
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port:`, PORT));
