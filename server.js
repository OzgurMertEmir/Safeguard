const oracledb = require('oracledb');

let pool;

async function init() {
  try {
    pool = await oracledb.createPool({
      user          : "oemir",
      password      : "Ygp8Whvnbl9X1CVOaFeoDkNJ",
      connectString : "oracle.cise.ufl.edu:1521/ORCL",
      poolMax       : 10, // Maximum number of connections
      poolTimeout   : 300 // Time in seconds after which idle connections are terminated
    });
    console.log("Oracle pool created successfully");
  } catch (err) {
    console.error("Error creating Oracle pool", err);
  }
}

module.exports = {
  pool,
  init,
}
