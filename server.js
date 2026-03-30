// Import the Express module, which is a framework for building web applications in Node.js.
const express = require('express');

// Create an instance of an Express application. This app object will be used to define routes and middleware.
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define a constant for the port number on which the server will listen.
const PORT = 3000;

const path = require('path');

// Set up a route handler for GET requests to the root URL ('/').
// Note this code block is above the static files as otherwise it will render index.html first instead of the ejs file
app.get('/', (req, res) => {
  res.render('login');
});

// Middleware for handling static files
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const PlayerModel = require('./models/playerModel');
const GamePlayModel = require('./models/gamePlayModel');
const playerModel = new PlayerModel();
const gamePlayModel = new GamePlayModel();
let username = "";
let user_id = null;


app.post('/authenticate', (req, res) => {
  const req_username = req.body.username;

  const req_user_id = playerModel.get_player_id(req_username);

  if(req_user_id == null){
    console.log(`[ERROR] Player with username ${req_username} not found in Players.`);
    res.redirect("/create_player");
    return;
  }

  username = req_username;
  user_id = req_user_id;
  res.redirect("/home");
});

app.get('/create_player', (req, res) => {
  res.render("create_player");
});

app.post('/add_player_tuple', (req, res) =>{
  playerModel.create(req.body.username, req.body.email);

  username = req.body.username;
  user_id = playerModel.get_player_id(req.body.username);

  res.redirect("/home");
});

app.get('/home', (req, res) => {
  res.render("home", {
    username: username
  });
});

app.post('/submit_score', (req, res) => {
  gamePlayModel.create(user_id, req.body.game_id, req.body.score);
  res.sendStatus(200);
});


// David Game -----------------------------------------------------------

app.get('/david', (req, res, next) => {
  res.redirect("/david_game.html");
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

// Start the server and make it listen on the specified port.
// Once the server starts, it logs a message to the console indicating where it is running.
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});