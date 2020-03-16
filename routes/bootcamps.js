const express = require("express");
const router = express.Router();
const Bootcamp = require("../models/Bootcamp");

// Middlewares
const advancedResults = require("../middlewares/advancedResults");

// Other Resources
const courseRouter = require("./courses");

// Reroute into other routers
router.use("/:bootcampId/courses", courseRouter);

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

router.route("/:id/photo").put(photoUpload);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getAll)
  .post(create);
router
  .route("/:id")
  .get(getSingle)
  .put(update)
  .delete(remove);

module.exports = router;
