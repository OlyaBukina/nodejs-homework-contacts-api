const express = require("express");
const { validateBody, authEnticate } = require("../../middlewares");
const { schemas } = require("../../models/user");
const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
} = require("../../controllers/user");

const router = express.Router();
/**
 * Register router
 */
router.post("/register", validateBody(schemas.validationSchema), register);

router.post("/login", validateBody(schemas.validationSchema), login);

router.get("/current", authEnticate, getCurrent);

router.post("/logout", authEnticate, logout);

router.patch(
  "/",
  authEnticate,
  validateBody(schemas.updateSubSchema),
  updateSubscription
);

module.exports = router;
