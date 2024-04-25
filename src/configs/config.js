const config = {
    clientURL: process.env.CLIENT_URL,
    serverURL: process.env.SERVER_URL,
    baseAddress : process.env.APP_URL,
    port:process.env.PORT,
    secret: process.env.SECRET,
    psql: {
      user: process.env.PSQL_USER,
      host: process.env.PSQL_HOST,
      database: process.env.PSQL_DATABASE,
      password: process.env.PSQL_PASSWORD,
      port: process.env.PSQL_PORT,
    },
    
    engine: {
      auth: '/auth',
      student: '/student',
    }
  };

  module.exports = {
    config
  };
