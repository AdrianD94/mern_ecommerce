const express = require("express");
const router = express.Router();

const {
  create,
  categoryById,
  read,
  update,
  remove,
  list
} = require("../controllers/category.js");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { categoryValidator } = require("../validator");

const { userById } = require("../controllers/user");

router.post(
  "/category/create/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  categoryValidator,
  create
);
router.get("/category/:categoryId", read);
router.get("/categories", list);

router.delete(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
