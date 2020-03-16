const express = require("express");
const router = express.Router({ mergeParams: true });
const Course = require("../models/Course");

// Middlewares
const advancedResults = require("../middlewares/advancedResults");

const { getCourses, getCourse, addCourse } = require("../controllers/courses");

router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description"
    }),
    getCourses
  )
  .post(addCourse);

router.route("/:id").get(getCourse);

module.exports = router;
