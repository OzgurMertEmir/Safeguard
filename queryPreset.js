/*
How does the severity of accidents change in different time intervals?

This query aims to analyze how the severity of accidents changes across different time intervals. 
The time intervals could be hourly, daily, weekly, monthly, or any other specified time period. 
By examining the "Severity" column in the dataset and comparing it to the "Start_Time" column,
we can see how the severity of accidents changes over time. For example, we could compare the 
average severity of accidents that occur in the morning to the average severity of accidents 
that occur in the evening. This information can help identify patterns or trends in accident 
severity that could be useful for creating effective prevention strategies.


How does the severity of accidents change in different weather conditions in different states?

This query aims to understand how the severity of accidents changes in different weather conditions 
in different states. We will analyze the data present in the columns "Severity," "Weather_Condition," 
and "State" of the dataset. First, we will group the accidents based on their severity levels, which can 
range from 1 to 4, mild to severe respectively. Next, we will categorize the weather conditions into various 
groups, such as sunny, rainy, snowy, etc. For each state, we will then calculate the number of accidents that 
took place under each weather condition for each severity level. With this information, we can visualize the 
results in a bar graph, with different bars representing the number of accidents for each severity level and 
weather condition. By comparing the heights of the bars, we can see how the severity of accidents changes with 
different weather conditions in different states. For instance, if we find that most of the severe accidents took 
place during rainy weather in state X, it would indicate that rainy weather increases the likelihood of severe 
accidents in that state. On the other hand, if we find that sunny weather is associated with a higher number 
of minor accidents in state Y, it would suggest that sunny weather has a lesser impact on the severity of accidents
in that state. By exploring the relationship between weather conditions and accident severity levels in 
different states, we can gain insights into how weather affects road safety and identify areas for improvement.


Which day of the week is the highest accident probability in the morning with different weather conditions for different states?

This query aims to identify the day of the week with the highest probability of accidents in the morning and to 
see how this varies based on weather conditions and state. By analyzing the "Start_Time" column and grouping the 
data by day of the week and weather condition, we can determine which day of the week has the highest number of 
accidents in the morning. Additionally, by grouping the data by state, we can see how the results vary across 
different states. This information can be useful for creating targeted prevention strategies for different states 
and weather conditions.


How does the number of accidents change in different time intervals for a specific zip code?

This query aims to understand how the number of accidents changes over time in a specific zip code. 
By examining the "Start_Time" column and grouping the data by time intervals (e.g. hourly, daily, weekly, etc.), 
we can determine how the number of accidents changes in a given zip code. This information can be useful for 
identifying hotspots of accidents in a specific area and creating localized prevention strategies by analyzing 
it together with the street/avenue names of the accidents..


How does the severity of accidents change in the presence of different traffic calming methods?

This query aims to understand how the severity of accidents is influenced by the presence of different traffic 
calming methods. By examining the "Severity" column and comparing it to the "Traffic_Calming" column, we can see 
how the severity of accidents changes based on the presence of traffic calming methods such as roundabouts, speed 
humps, or traffic circles. This information can be useful for determining the effectiveness of different traffic 
calming methods and creating more effective strategies for reducing the severity of accidents.
*/

const OracleDB = require("oracledb");
const { pool } = require("./server");

// Query 1: How does the severity of accidents change in different time intervals?
async function severityToTimeIntervals() {
  const connection = await OracleDB.getConnection();
  try {
    result = await connection.execute(
        "Select count(*) from accident group by severity order by severity"
    );
    return result;
  } finally {
    connection.close();
  }
}

// Query 2: How does the severity of accidents change in different weather conditions in different states?
async function severityToWeatherCondition() {
    const connection = await OracleDB.getConnection();
    try {
        result = await connection.execute(
            "Select weather_condition, count(*) from climate group by weather_condition"
        );
        return result;
      } finally {
        connection.close();
      }
    }

// Query 3: Which day of the week is the highest accident probability in the morning with different weather conditions for different states?
async function AccidentProbabilityPerDayInMornings(Weather_Condition, state) {
    const client = await pool.connect();
    try {
      client.query(
          'Write query here'
      );
    } finally {
      client.release();
    }
  }

// Query 4: How does the number of accidents change in different time intervals for a specific zip code?
async function AccidentCountsPerTimeIntervals(zip_code) {
    const client = await pool.connect();
    try {
      client.query(
          'Write query here'
      );
    } finally {
      client.release();
    }
  }

// Query 5: How does the severity of accidents change in the presence of different traffic calming methods?
async function severityToTrafficCalming() {
    const client = await pool.connect();
    try {
      client.query(
          'Write query here'
      );
    } finally {
      client.release();
    }
  }

module.exports = {
  severityToTimeIntervals,
  severityToWeatherCondition,
  AccidentProbabilityPerDayInMornings,
  AccidentCountsPerTimeIntervals,
  severityToTrafficCalming
};
