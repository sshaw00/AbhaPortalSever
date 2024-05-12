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
  getBatches,
  getCentres,
  getStudents,
  addStudents,
  getStudentsByCentre,
  deleteStudent,
  addBatches,
  updateStudent,
} = require("../controllers/auth");
const {
  registerValidation,
  loginValidation,
  forgotpasswordvalidation,
  resetPasswordValidation,
} = require("../validators/auth");
const {
  validationMiddleware,
} = require("../middlewares/validations-middleware.js");
const { userAuth } = require("../middlewares/auth-middleware.js");

router.get("/", (req, res) => {
  try {
    // Sending a success response
    res.status(200).send("Getting Response");
  } catch (error) {
    // Sending an error response
    res.status(500).send("An error occurred: " + error.message);
  }
});

router.get("/get-users", getUsers);
router.get("/protected", userAuth, protected);
router.post(
  "/auth/register",
  registerValidation,
  validationMiddleware,
  register
);
router.post("/auth/login", loginValidation, validationMiddleware, login);
router.get("/logout", logout);

router.get("/random", random);
router.post(
  "/forgotpassword",
  forgotpasswordvalidation,
  validationMiddleware,
  forgotpassword
);
router.post(
  "/resetpassword/:id/:token",
  resetPasswordValidation,
  resetpassword
);
router.post("/student/get-batches", getBatches);
router.get("/student/get-centres", getCentres);
router.post("/student/get-students", getStudents);
router.post("/student/get-students-by-centre", getStudentsByCentre);
router.post("/student/add-students", addStudents);
router.post("/student/add-batches", addBatches);
router.post("/student/delete-student", deleteStudent);
router.post("/student/update-student", updateStudent);

module.exports = router;
