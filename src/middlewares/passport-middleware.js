const passport = require("passport");
const { Strategy } = require("passport-jwt");
const { SECRET } = require("../constants");
const { queryDB } = require("../services/queryDB");
const queries = require("../queryConstants/authQueries");

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) token = req.cookies["token"];
  return token;
};

const opts = {
  secretOrKey: SECRET,
  jwtFromRequest: cookieExtractor,
};

passport.use(
  new Strategy(opts, async ({ employee_id }, done) => {
    try {
      console.log(id);
      const { rows } = await queryDB(queries.particularTrainerById, [
        employee_id,
      ]);
      console.log(rows);
      if (!rows.length) {
        throw new Error("401 not authorized");
      }

      let user = { id: rows[0].employee_id, email: rows[0].employee_email };

      return await done(null, user);
    } catch (error) {
      console.log(error.message);
      done(null, false);
    }
  })
);
