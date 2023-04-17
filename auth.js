const OracleDB = require("oracledb");

async function validateUser(username, password) {
    let conn;
    try {
      conn = await OracleDB.getConnection();
      console.log(username, password);
      const result = await conn.execute(
        "SELECT * FROM USERS WHERE username = :username AND password = :password",
        {username: username, password: password}
      );
      
      console.log(result);
      if (result.rows.length === 1) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      if (conn) {
        await conn.close();
      }
    }
  }

  async function registerUser(username, password) {
    let conn;
    try {
      conn = await OracleDB.getConnection();
      const result = await conn.execute(
        "INSERT INTO USERS (username, password) VALUES (:username, :password)",
        {username: { dir: OracleDB.BIND_IN, val: username, type: OracleDB.STRING }, password: { dir: OracleDB.BIND_IN, val: password, type: OracleDB.STRING }}
      );
      console.log(result);
      await conn.commit();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      if (conn) {
        await conn.close();
      }
    }
  }
  
  
module.exports = {
  validateUser,
  registerUser
}