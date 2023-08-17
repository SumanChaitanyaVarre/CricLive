const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "gowri",
//   password: "30001133",
//   host: "localhost",
//   port: 5432,
//   database: "projectdb"
// });

// const pool = new Pool({
//   user: "postgres",
//   password: "Bannu2002@",
//   host: "localhost",
//   port: 5432,
//   database: "projectdb"
// });

const pool = new Pool({
  user: "postgres",
  password: "klaus369",
  host: "localhost",
  port: 5432,
  database: "projectdb"
});


module.exports = pool;