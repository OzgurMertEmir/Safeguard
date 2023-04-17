const express = require('express');
const queryPreset = require('./queryPreset');
const {init} = require('./server')
const path = require('path');
const bodyParser = require('body-parser');
const {validateUser, registerUser} = require('./auth')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

init();

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
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});
  
app.get('/severityToTimeIntervals', async (req, res) => {
  try {
    const result = await queryPreset.severityToTimeIntervals();
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/severityToWeatherCondition', async (req, res) => {
    try {
      const result = await queryPreset.severityToWeatherCondition();
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.get('/AccidentProbabilityPerDayInMornings', async (req, res) => {
    try {
      const result = await queryPreset.AccidentProbabilityPerDayInMornings();
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.get('/AccidentCountsPerTimeIntervals', async (req, res) => {
    try {
      const result = await queryPreset.AccidentCountsPerTimeIntervals();
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.get('/severityToTrafficCalming', async (req, res) => {
    try {
      const result = await queryPreset.severityToTrafficCalming();
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
