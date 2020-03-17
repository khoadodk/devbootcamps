const express = require("express");

const router = express.Router();

// Middlewares
const advancedResults = require("../middlewares/advancedResults");
const { protect, authorize } = require("../middlewares/auth");
const User = require("../models/User");

const {
  getUser,
  getUsers,
  updateUser,
  createUser,
  deleteUser
} = require("../controllers/users");

// Apply to all routes
router.use(protect);
router.use(authorize("admin"));

router
  .route("/")
  .get(advancedResults(User), getUsers)
  .post(createUser);

router
  .route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
