const express = require('express');
const queryPreset = require('./queryPreset');
const {init, runQuery} = require('./server')
const path = require('path');
const bodyParser = require('body-parser');
const {validateUser, registerUser} = require('./auth')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

init();
// runQuery().catch(console.error);
app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

app.post("/auth/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const isValidUser = await validateUser(username, password);
    if (isValidUser) {
        console.log("Login successful!");
        res.send("Login successful!");
    } else {
        console.log("Invalid username or password!");
        res.send("Invalid username or password!");
    }
  });

  app.post("/auth/register", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
      const isRegistered = await registerUser(username, password);
      if (isRegistered) {
        console.log("Register successful!");
        res.send("User registered successfully!");
      } else {
        console.log("Invalid username or password!");
        res.send("Invalid username or password!");
      }
    } catch (err) {
      console.error(err);
      res.send("Error registering user!");
    }
  });

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

/*
app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});
*/

app.get('/trend_1', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'trend_1.html'));
});
app.get('/trend_2', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'trend_2.html'));
});
app.get('/trend_3', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'trend_3.html'));
});
app.get('/trend_4', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'trend_4.html'));
});
app.get('/trend_5', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'trend_5.html'));
});

app.get('/severityToTimeIntervals/:state', async (req, res) => {
  try {
    const state = req.params.state;
    const result = await queryPreset.severityToTimeIntervals(state);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/severityToWeatherCondition/:weather/:state/:severityFilter', async (req, res) => {
    try {
      const state = req.params.state;
      const weather = decodeURIComponent(req.params.weather);
      const severityFilter = req.params.severityFilter;
      const result = await queryPreset.severityToWeatherCondition(weather, state, severityFilter);
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.get('/accidentProbabilityPerDayInMornings/:weather/:state', async (req, res) => {
    try {
      const weather = decodeURIComponent(req.params.weather);
      const state = req.params.state;
      const result = await queryPreset.accidentProbabilityPerDayInMornings(weather, state);
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.get('/accidentsPerTimeIntervals/:zipCode', async (req, res) => {
    try {
      const zipCode = req.params.zipCode;
      const result = await queryPreset.accidentsPerTimeIntervals(zipCode);

      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.get('/severityToTrafficCalming/:trafficFeature/:severityFilter', async (req, res) => {
    try {
      const trafficFeature = req.params.trafficFeature;
      const severityFilter = req.params.severityFilter;
      const result = await queryPreset.severityToTrafficCalming(trafficFeature, severityFilter);
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
