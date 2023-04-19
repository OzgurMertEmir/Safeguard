const OracleDB = require("oracledb");
const { pool } = require("./server");

async function severityToTimeIntervals(state) {
    const connection = await OracleDB.getConnection();
    try {
        const result = await connection.execute(
            `SELECT EXTRACT(HOUR FROM Start_Time) AS Hour, AVG(Severity) AS Average_Severity
            FROM accident a join address ad on a.id=ad.id 
            where state = :state
            GROUP BY EXTRACT(HOUR FROM Start_Time)
            ORDER BY Hour`, {state: state}
        );
        return result;
    } finally {
        connection.close();
    }
}

async function severityToWeatherCondition(state) {
    const connection = await OracleDB.getConnection();
    console.log(state);
    try {
        const result = await connection.execute(
            `SELECT Weather_Condition, AVG(Severity)
            FROM accident a JOIN address ad ON a.id=ad.id JOIN climate c ON ad.id=c.id
            WHERE state = :state
            GROUP BY Weather_Condition 
            ORDER BY AVG(Severity) DESC
            FETCH FIRST 10 ROWS ONLY` , {state: state}
        );
        return result;
    } finally {
        connection.close();
    }
}

// Query 3: Which day of the week is the highest accident probability in the morning with different weather conditions for different states?
async function accidentProbabilityPerDayInMornings(weather, state) {
    const connection = await OracleDB.getConnection();
    try {
      const result = await connection.execute(
          `SELECT TO_CHAR(start_time, 'DAY') AS day_of_week, COUNT(*) AS Accident_Count
          FROM accident a join climate c on a.id=c.id join address ad on c.id=ad.id 
          WHERE EXTRACT(HOUR FROM start_time) < 12 and EXTRACT(HOUR FROM start_time) >= 6 and Weather_Condition = :weather and State = :state
          GROUP BY TO_CHAR(start_time, 'DAY')`,
          { weather: weather, state: state }
    );
    return result;
    } finally {
      connection.close();
    }
  }

async function accidentsPerTimeIntervals(zip_code) {
    const connection = await OracleDB.getConnection();
    try {
        const result = await connection.execute(
            `SELECT
          LPAD(EXTRACT(HOUR FROM a.Start_Time), 2, '0') || ':00-' || LPAD(EXTRACT(HOUR FROM a.Start_Time), 2, '0') || ':59' AS interval,
          COUNT(*) AS count
        FROM
          accident a
        JOIN
          address ad ON a.id = ad.id
        WHERE
          ad.Zip_Code = :zip_code
        GROUP BY
          EXTRACT(HOUR FROM a.Start_Time)
        ORDER BY
          EXTRACT(HOUR FROM a.Start_Time)`,
            { zip_code: zip_code }
        );
        return result;
    } finally {
        connection.close();
    }
}

// Query 5: How does the severity of accidents change in the presence of different traffic calming methods?
async function severityToTrafficCalming(trafficFeature) {
    const connection = await OracleDB.getConnection();
    try {
        const query = "SELECT a.severity, COUNT(*) AS count " +
            "FROM accident a " +
            "JOIN trafficjam t ON a.id = t.id " +
            "WHERE t." + trafficFeature + " = 'True' " +
            "GROUP BY a.severity " +
            "ORDER BY a.severity";
        const result = await connection.execute(query);

        return result;
    } finally {
        connection.close();
    }
}


module.exports = {
    severityToTimeIntervals,
    severityToWeatherCondition,
    accidentProbabilityPerDayInMornings,
    accidentsPerTimeIntervals,
    severityToTrafficCalming
};
