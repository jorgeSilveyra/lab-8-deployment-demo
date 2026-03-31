// Import the Express module, which is a framework for building web applications in Node.js.
const express = require('express');
const Logger = require("./tools/log.js");
const logger = new Logger('requests.log', true);

// Create an instance of an Express application. This app object will be used to define routes and middleware.
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define a constant for the port number on which the server will listen.
const PORT = 3000;

const path = require('path');

// Set up a route handler for GET requests to the root URL ('/').
// Note: Above the redirect to the public folder as it will just render index.html instead otherwise
app.get('/', (req, res) => {
  logger.write("[INFO] User connected to root URL '/' to login. Route: / Method: GET");
  res.redirect('/login.html');
});

// Middleware for handling static files
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const PlayerModel = require('./models/playerModel');
const GamePlayModel = require('./models/gamePlayModel');
const ReportModel = require('./models/reportModel');
const playerModel = new PlayerModel();
const gamePlayModel = new GamePlayModel();
const reportModel = new ReportModel();
let username = "";
let user_id = null;

app.get('/home', (req, res) => {
  if(username == ""){
    logger.write("[WARN] Player attempted to access /home before logging in. Redirecting to /login page Route: /home Method: GET");
    res.redirect("/");
    return;
  }

  logger.write(`[INFO] Player with username: ${username} accessed /home. Route: /home Method: GET`);

  res.render("home", {
    username: username
  });
});

app.get('/create_player', (req, res) => {
  logger.write("[INFO] User attempting to create a new Player at /create_player. Route: /create_player Method: GET");

  res.redirect("/create_player.html");
});

app.post('/authenticate', (req, res) => {
  const req_username = req.body.username;

  logger.write(`[INFO] User attempting to login with username: ${req_username} at POST method /authenticate. Route: /autheticate Method: POST`);

  const req_user_id = playerModel.get_player_id(req_username);

  if(req_user_id == null){
    logger.write(`[WARN] Player with username ${req_username} not found in Players. Redirecting player to /create_player. Route: /authenticate Method: POST`);
    res.redirect("/create_player");
    return;
  }

  username = req_username;
  user_id = req_user_id;

  logger.write(`[INFO] Player successfully logged in with username: ${username}, user_id: ${user_id}. Redirecting the to /home. Route: /authenticate Method: POST`);

  res.redirect("/home");
});


app.post('/add_player_tuple', (req, res) =>{
  logger.write(`[INFO] User attempting to create player with username: ${req.body.username}, email: ${req.body.email}. Route: /add_player_tuple Method: POST`)

  try{
    playerModel.create(req.body.username, req.body.email);
  } catch (e){

    if(playerModel.get_player_id(req.body.username) == null){
      logger.write(`[ERROR] Player with email ${req.body.email} already exists. Redirecting the user to /create_player. Throws error ${e}. Route: /add_player_tuple Method: POST`);
      res.redirect("/create_player");

      return;
    }else{
      logger.write(`[ERROR] Player with username ${req.body.username} already exists. Logging user in and redirecting to /home. Throws error ${e}. Route: /add_player_tuple Method: POST`);

      username = req.body.username;
      user_id = playerModel.get_player_id(username);
      res.redirect("/home");

      return;
    }
  }

  username = req.body.username;
  user_id = playerModel.get_player_id(username);

  logger.write(`[INFO] Player created with username: ${username} and user_id: ${user_id}. Redirecting the player to /home. Route: /add_player_tuple Method: POST`);

  res.redirect("/home");
});

app.get('/leaderboard', (req, res) => {
  if(username == ""){
    logger.write("[WARN] Player attempted to access /leaderboard before logging in. Redirecting to /login page.  Route: /leaderboard Method: GET");
    res.redirect("/");
    return;
  }

  logger.write(`[INFO] Player with username: ${username} accessed /leaderboard. Route: /leaderboard Method: GET`)

  const david_info = reportModel.get_top_5_players(4);
  const cj_info = reportModel.get_top_5_players(5);

  res.render('leaderboard', {
    david_game: david_info,
    cj_game: cj_info
  });
});

app.post('/submit_score', (req, res) => {
  logger.write(`[INFO] Attempting to create GamePlay record with user_id: ${user_id}, game_id: ${req.body.game_id}, and score: ${req.body.score}.  Route: /submit_score Method: POST`);

  try{
    gamePlayModel.create(user_id, req.body.game_id, req.body.score);
  } catch (e){
    logger.write(`[ERROR] GamePlay record writing encountered an error, ${e},  Route: /submit_score Method: POST`);
  }

  logger.write("[INFO] GamePlay record written successfully. Route: /submit_score Method: POST");

  res.sendStatus(200);
});

// David Game -----------------------------------------------------------
app.get('/david', (req, res) => {
  if(username == ""){
    logger.write("[WARN] Player attempted to access /david before logging in. Redirecting to /login page. Route: /david Method: GET");
    res.redirect("/");
    return;
  }

  logger.write(`[INFO] Player with username: ${username} accessed /david. Route: /david Method: GET`)

  res.redirect("/david_game.html");
});

// cj game
app.get('/cj', (req, res) => {
  if(username == ""){
    logger.write("[WARN] Player attempted to access /cj before logging in. Redirecting to /login page. Route: /cj Method: GET");
    res.redirect("/");
    return;
  }

  logger.write(`[INFO] Player with username: ${username} accessed /cj. Route: /cj Method: GET`)

  res.redirect("/cj_game.html");
});

// Start the server and make it listen on the specified port.
// Once the server starts, it logs a message to the console indicating where it is running.
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});