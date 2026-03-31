[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/YSW3Q7HE)
# Lab-8

## Project Organization
Lab 8 connects all of the pieces we have worked on throughout this semester in a Model View Controller (MVC) manner. Our Model contains the database and the models we create to interact with the database. Our Controller contains the server.js file, handling connections and acting as a layer between the user and the database. Our View contains our .html files, .ejs pages, and any required .js and .css files needed for them. We additionally implement a Logger to record log entries for debugging and informational purposes. For this project, we implement a game website, where we feature 2 games made by David and CJ as well as a user directory, leaderboard, and login system. 

```
.
├── Instructions.md - Lab 8's instructions
├── README.md
├── cli.js - contains code that runs the CLI (Command Line Interface)
├── database.js - code that connects a model to the database
├── db.sqlite - the Sqlite database
├── models - contains models server.js and cli.js use to interact with the database
├── public - contains static information, including .html pages, css stylesheets, images, and .js files
│   ├── css - contains stylesheets for .html pages
│   ├── images - contains images used in .html pages
│   └── js - contains JavaScript files used to run the games and .html pages
├── requests.log - a file containing log entries of the server
├── server.js - a JavaScript file containing an express server that runs our game website
├── sql - contains .sql scripts to drop tables, create tables, and populate predefined data into the database
├── tools - contains .js files which have tools used for this project, including a Logger class
└── views - contains all dynamic .ejs pages used for the express server

```

## Collaboration
In this lab, David and CJ worked together to start an initial server and establish connections between server.js, the database, and the .html and .ejs files. David worked on his game, the multiplication game, and CJ worked on his game, the typing game. David imported the CLI from a separate lab and tested it to ensure it works within this one. CJ created the /players page, the user directory. David created the Login, Create User, and Home page. David and CJ implemented the Logger class within server.js. David developed the README.md. 

## Checklist of Requirements
The lab fulfills the following requirements set by the lab instructions:
- The server runs without crashing
- All required routes are implemented and work, with their pages being fully developed.
- Data persists in the database and in addition the CLI and Web server match in their data.
- Each partner has implemented a working game that utilizes user input in a creative fashion.
- Logging has been implemented.
- The README.md file has been PARTIALLY completed according to previous and current lab instructions.

## Usage Instructions
When visiting the root of the server, `/`, the user is greeted with a login page. The user must login to the website to continue. They may either enter their username or create a new player. If the user enters a username that does not already exist, they will be automatically redirected to the create player page when clicking login. When creating a player, please note:

- If you enter a username that is already associated with a player, you will be logged in as that player, and the email you enter will not be inputted for the player with that username.
- If you enter a unique username but additionally an email that is already in use, the create player page will be refreshed and you will not be taken forwards to the home page.
- Input of an existing username or of a unique username and unique email will grant successful login/account creation and you will be taken to the home page.

Once at the home page, `/home`, the user may either,
- Play David's game via a hyperlink
- Play CJ's game via a hyperlink
- View a directory of players via a hyperlink
- View the leaderboards showing the top 5 scores in each game via a hyperlink
- Logout and return to the User Login page.

Please note that attempting to access any of these pages without logging in will redirect the user to the login page to login. Below is a list of full paths and their functions:

- `/` - the player login page
- `/create_player` - allows the user to create a player
- `/home` - the home page of our game website
- `/david` - the page of David's game
- `/cj` - the page of CJ's game
- `/players` - a page with a user directory listing all players
- `/players/:id` - a page displaying a player's information where :id is the player's id
- `/leaderboard` - a page displaying the top 5 scores for each game

Below is a list of additional redirects that should not be accessed by the user but are documented here for informational purposes:

- `/authenticate` - a POST request that checks whether the an inputted username is associated with a user and redirects accordingly
- `/add_player_tuple` - a POST request that adds a player to the Players relation in the database using the inputted parameters (username, email)
- `/submit_score` - a POST request that adds a player's score to the GamePlays relation in the database using the inputted parameters (game_id, score)

## Design Decisions
When designing this website, we pondered at the question of how we would get the user's user_id, or their username, to input their score once a game was played. Instead of having the user input their username each time a game is played, we decided to implement a login system where the user must login to an account of create a player account first. Therefore, once logged in, they can play however many games they want with little interruption. In addition, it mimics the structure will be used for our main projects in this CS205 class, where a login system will be needed to store user accounts. In this project, we store their username and user_id as a global variable. This is sufficient for a project located on a local server, however for the final project, sessions through express-session or a similar concept will have to be used to allow multiple people to access the website at the same time. 

## Encountering Issues
One issue that was encountered was timing within JS. setTimeout() is a useful method that allows a user to run a specified function after a certain number of milliseconds has passed. This is useful in David's game, as it allows the player to see if their answer was correct or not before they move on to the next question. When first implemented however, it was a buggy mess and did not work. But, it was noticed that the code was creating a question, and then resetting it for a new one after 2 seconds. In the code, setTimeout() was declared as a global variable, as it was interperated wrongly that it was something you called as a variable (don't ask why). Therefore, the setTimeout() ran once, reset the problem, and then continued on. This led to the realization that setTimeout() should instead be used inside the eventListener for "Enter" on the input text box so that it would execute reset_problem() after 2000 milliseconds. This is one example of many where clues, either visual or written through the console, helped reveal a bug or misunderstanding of a piece of code. 