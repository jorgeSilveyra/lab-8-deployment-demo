// Import the Express module, which is a framework for building web applications in Node.js.
const express = require('express');

// Create an instance of an Express application. This app object will be used to define routes and middleware.
const app = express();
app.use(express.urlencoded({ extended: true }));

// Define a constant for the port number on which the server will listen.
const PORT = 3000;

const path = require('path');

// Middleware for handling static files
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const PlayerModel = require('./models/playerModel');
const playerModel = new PlayerModel();

// Set up a route handler for GET requests to the root URL ('/').
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/authenticate', (req, res) => {
  const username = req.body.username;

  const user_id = playerModel.get_player_id(username);

  if(user_id == null){
    console.log(`[ERROR] Player with username ${username} not found in Players.`);
    res.redirect("/create_player");
    return;
  }

  res.redirect("/home");
});

app.get('/create_player', (req, res) => {
  res.render("create_player");
});

app.get('/home', (req, res) => {
  res.redirect("/index.html");
});

// Start the server and make it listen on the specified port.
// Once the server starts, it logs a message to the console indicating where it is running.
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});



// David Game ------------------------------------------------------------
const GamePlayModel = require('./models/gamePlayModel');
const gamePlayModel = new GamePlayModel();

app.get('/david', (req, res, next) => {
  res.render('david_game');
});

app.post('/david_submit', (req, res) => {
  const username = req.body.username;
  const score = req.body.score;

  const user_id = playerModel.get_player_id(username);

  if(user_id == null){
    console.log(`[ERROR] Player with username ${username} not found in Players.`);
    return; 
    //have user create new profile and then try and resubmit info again?
  }

  try{
    gamePlayModel.create(user_id, 4, score);
  } catch (e){
    console.log(e);
    console.log("[ERROR] An error occurred while adding the record to the GamePlay relation.");
  }

  res.redirect('/index.html');
});

