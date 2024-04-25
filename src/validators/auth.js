const { check } = require("express-validator");
const { compare } = require("bcryptjs");
const { queryDB } = require("../services/queryDB");
const queries = require("../queryConstants/authQueries")

//password
const password = check("password")
  .isLength({ min: 6, max: 15 })
  .withMessage("Password has to be between 6 and 15 characters.");

//email
const email = check("email")
  .isEmail()
  .withMessage("Please provide a valid email.");

//check if email exists
const emailExists = check("email").custom(async (value) => {
  const { rows } = await queryDB(queries.particularTrainerByEmail,[value],"get trainner by mail")
  if (rows.length) {
    throw new Error("Email already exists.");
  }
});

const EmailDoesNotExist = check("email").custom(async (value) => {
  const { rows } = await queryDB(queries.particularTrainerByEmail,[value],"get trainner by mail")
  if (!rows.length) {
    console.log("Email does not exist.");
    throw new Error("Email does not exist.");
  } else {
    console.log("Email Exists");
  }
});

//login validation
const loginFieldsCheck = check("email").custom(async (value, { req }) => {
  const user = await queryDB(queries.particularTrainerByEmail,[value],"get trainner by mail")

  if (!user.rows.length) {
    throw new Error("Email does not exists.");
  }

  const validPassword = await compare(req.body.password, user.rows[0].password);

  if (!validPassword) {
    throw new Error("Wrong password");
  }

  req.user = user.rows[0];
});

module.exports = {
  registerValidation: [email, password, emailExists],
  loginValidation: [loginFieldsCheck],
  forgotpasswordvalidation: [email, EmailDoesNotExist],
};
