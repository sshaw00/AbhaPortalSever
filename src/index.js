const express = require("express");
const app = express();
const { PORT, CLIENT_URL, SERVER_URL } = require("./constants");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const path = require("path");
const { Pool } = require("pg");
const dotenv = require("dotenv").config();

const _dirname = path.dirname("");
const buildPath = path.join(__dirname, "../../client/build");
// app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.static(buildPath));

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

// app.get("/*", function (req, res) {
//   res.sendFile(
//     path.join(__dirname, "../../client/build/index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );
// });

require("./middlewares/passport-middleware");

app.use(cookieParser());
app.use(passport.initialize());

const authRoutes = require("./routes/auth");

app.use("/api", authRoutes);

// // const appStart = () => {
// //   try {
// app.listen(PORT, () => {
//   console.log(`The app is running at http://localhost:${PORT}`);
// });
// //
// //   } catch (error) {
// //     console.log(`Error: ${error.message}`);
// //   }
// // };

// // appStart();

const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DATABASE,
  password: process.env.PSQL_PASSWORD,
  port: process.env.PSQL_PORT,
});

pool.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to PostgreSQL database:", err);
    process.exit(1);
  } else {
    console.log(
      `Connected to database at ${process.env.PSQL_HOST}:${process.env.PSQL_PORT}/${process.env.PSQL_DATABASE}`
    );
    app.listen(PORT, () => {
      console.log(`The app is running at ${SERVER_URL}`);
    });
  }
});
