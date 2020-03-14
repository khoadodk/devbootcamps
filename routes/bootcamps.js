const express = require("express");
const router = express.Router();

const {
  getAll,
  getSingle,
  create,
  update,
  remove
} = require("../controllers/bootcamps");

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
