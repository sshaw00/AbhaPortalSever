const express = require("express");

const router = express.Router();
const multer = require("multer");
// const fetch = require("node-fetch");
const applicant = require("./s3.js");
// const { verifyToken } = require("../middlewares/auth");
// const { kafkaServiceQueue } = require("./kafkaService");
// const { kafkaApiEndPoints, kafkaTopics } = require("../utils/constants");
const { s3UploadFile } = require("./s3UploadFile.js");
// const { logger } = require("../middlewares/winston");
// const { getToken } = require("../models/generateToken");

const upload = multer();
router.put(
  "/student/docs/uploads3",

  upload.single("file"),
  (req, res, next) => {
    const { user, filename } = req.body;
    s3UploadFile(req.file, filename)
      .then((item) => res.send({ item }))
      .catch(next);
  }
);
// Update docs in db
// router.put("/customer/:customer_id/uploaddb", verifyToken, (req, res, next) => {
//   const { s3links, filetype, password, customerUUID } = req.body;
//   applicant
//     .documentUploadDB(
//       req.params.customer_id,
//       req.query.loan_ref_id,
//       filetype,
//       password,
//       s3links,
//       customerUUID
//     )
//     .then((item) => {
//       kafkaServiceQueue(
//         kafkaApiEndPoints.document,
//         { document_id: item[0].document_id },
//         kafkaTopics.document,
//         "put"
//       );
//       res.send({ item });
//     })
//     .catch(next);
// });

module.exports = router;
