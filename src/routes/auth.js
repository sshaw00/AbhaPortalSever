const { Router } = require("express");
const router = Router();
const {
  getUsers,
  register,
  login,
  protected,
  logout,
  random,
  forgotpassword,
  resetpassword,
} = require("../controllers/auth");
const {
  registerValidation,
  loginValidation,
  forgotpasswordvalidation,
} = require("../validators/auth");
const {
  validationMiddleware,
} = require("../middlewares/validations-middleware.js");
const { userAuth } = require("../middlewares/auth-middleware.js");

router.get("/get-users", getUsers);
router.get("/protected", userAuth, protected);
router.post("/register", registerValidation, validationMiddleware, register);
router.post("/login", loginValidation, validationMiddleware, login);
router.get("/logout", logout);
router.get("/random", random);
router.post(
  "/forgotpassword",
  forgotpasswordvalidation,
  validationMiddleware,
  forgotpassword
);
router.post("/resetpassword/:id/:token", resetpassword);

module.exports = router;
