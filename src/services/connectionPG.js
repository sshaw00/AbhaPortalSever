const { Pool } = require("pg");
const { config } = require("../configs/config");

const aafPortalMain = new Pool({
  user: config.psql.user,
  host: config.psql.host,
  database: config.psql.database,
  password: config.psql.password,
  port: config.psql.port,
  // ssl: {
  //   require: true,
  //   rejectUnauthorized: false,
  // },
});

const connectDb = async (pool) => {
  await pool.connect((err) => {
    if (err) {
      console.error("connection error", err.stack);
    }
  });
};

connectDb(aafPortalMain);

module.exports = { aafPortalMain };
