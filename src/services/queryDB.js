const dbClient = require('./connectionPG')
const queryDB = (query, variables = [], message) => new Promise((resolve, reject) => {
  console.log(dbClient);
  dbClient.aafPortalMain.query(query, [...variables], (err, res) => {
    if (err) {
      console.log(query, err, message)
      reject(err);
    } 
    else {
        console.log(message);
      resolve(res);
    }
  });
});


module.exports = {
  queryDB,
};
