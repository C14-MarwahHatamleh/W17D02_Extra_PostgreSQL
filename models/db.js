const pg = require("pg");

const pool = new pg.Pool({
  connectionString: process.env.CONNECTION_STRING,
});
pool
  .connect()
  .then(() => { console.log("Db Connected");})
  .catch(() => {
     console.log("Error Db Connected");
  });


module.exports = pool;
