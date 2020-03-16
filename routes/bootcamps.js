const express = require("express");
const router = express.Router();

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
  getWithinRadius
} = require("../controllers/bootcamps");

router.route("/radius/:zipcode/:distance").get(getWithinRadius);

router
  .route("/")
  .get(getAll)
  .post(create);
router
  .route("/:id")
  .get(getSingle)
  .put(update)
  .delete(remove);

module.exports = router;
