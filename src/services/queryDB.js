const dbClient = require("./connectionPG");
const queryDB = (query, variables = [], message) =>
  new Promise((resolve, reject) => {
    // console.log(dbClient);
    dbClient.aafPortalMain.query(query, [...variables], (err, res) => {
      if (err) {
        //console.log(query, err, message, "1234");
        reject(err);
      } else {
        //console.log(message, "123");
        resolve(res);
      }
    });
  });

module.exports = {
  queryDB,
};
