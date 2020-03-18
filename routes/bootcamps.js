const express = require("express");
const router = express.Router();

const Bootcamp = require("../models/Bootcamp");
const { protect, authorize } = require("../middlewares/auth");

// Middlewares
const advancedResults = require("../middlewares/advancedResults");

// Other Resources
const courseRouter = require("./courses");
const reviewRouter = require("./reviews");

// Reroute into other routers
router.use("/:bootcampId/courses", courseRouter);
router.use("/:bootcampId/reviews", reviewRouter);

const {
  getAll,
  getSingle,
  create,
  update,
  remove,
  getWithinRadius,
  photoUpload
} = require("../controllers/bootcamps");

router.route("/radius/:zipcode/:distance").get(getWithinRadius);

router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), photoUpload);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getAll)
  .post(protect, authorize("publisher", "admin"), create);

router
  .route("/:id")
  .get(getSingle)
  .put(protect, authorize("publisher", "admin"), update)
  .delete(protect, authorize("publisher", "admin"), remove);

module.exports = router;
