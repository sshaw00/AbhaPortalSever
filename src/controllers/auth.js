const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET, CLIENT_URL } = require("../constants");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { queryDB } = require("../services/queryDB");
const queries = require("../queryConstants/authQueries")

exports.random = async (req, res) => {
  try {
    console.log("Getting Response");
  } catch (error) {
    console.log(error.message);
  }
};
exports.getUsers = async (req, res) => {
  try {
    const { rows } = await queryDB (queries.trainerEmailID,[],"get email and id of all trainers")
    console.log({ rows });
    return res.status(200).json({
      success: true,
      users: rows,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.register = async (req, res) => {
  const { email, password, name, phone } = req.body;
  try {
    const hashedPassword = await hash(password, 10);
    const status = true;
    await queryDB(queries.registerTrainer,[email, hashedPassword, name, phone, status],"register a trainer")
    return res.status(201).json({
      success: true,
      message: "The registraion was successfull",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  let user = req.user;

  let payload = {
    id: user.trainer_id,
    email: user.email,
  };

  try {
    const token = await sign(payload, SECRET);
    return res.status(200).cookie("token", token, { httpOnly: true }).json({
      success: true,
      message: "Logged in succefully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.protected = async (req, res) => {
  try {
    return res.status(200).json({
      info: "protected info",
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie("token", { httpOnly: true }).json({
      success: true,
      message: "Logged out succefully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.forgotpassword = async (req, res) => {
  const { email } = req.body;
  const user = await queryDB(queries.particularTrainerByEmail,[email],"get all data of a trainer");

  const secret = SECRET + user.rows[0].password;

  try {
    const token = jwt.sign({ id: user.rows[0].trainer_id }, SECRET, {
      expiresIn: "5m",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "swarupps66@gmail.com",
        pass: "awmg lgqw note idaf",
      },
    });

    var mailOptions = {
      from: "swarupps66@gmail.com",
      to: `${email}`,
      subject: "Reset AbhaPortal Password",
      html: `<h2>Link to Reset Password</h2><p>${CLIENT_URL}/resetpassword/${user.rows[0].trainer_id}/${token}</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.status(201).json({
          success: true,
          message: "Mail has been sent",
        });
      }
    });
    return res.status(201).json({
      success: true,
      message: "Mail has been sent",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.resetpassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  console.log(token);
  console.log(id);
  console.log(password);

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({
        error: "Error with Token",
      });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          queryDB(queries.updatePassword,[hash, id])
            .then((u) =>
              res.status(201).json({
                success: true,
                message: "Password Changed Succexfully",
              })
            )
            .catch((err) =>
              res.status(500).json({
                error: err.message,
              })
            );
        })
        .catch((err) =>
          res.status(500).json({
            error: err.message,
          })
        );
    }
  });
};
