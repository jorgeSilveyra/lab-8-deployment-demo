const readlineSync = require('readline-sync');
const PlayerModel = require('./models/playerModel');
const ReportModel = require('./models/reportModel');
const GamePlayModel = require('./models/gamePlayModel');
const GameDefinitionModel = require('./models/gameDefinitionModel');

const playerModel = new PlayerModel();
const reportModel = new ReportModel();
const gamePlayModel = new GamePlayModel();
const gameDefinitionModel = new GameDefinitionModel();

// Wait for user's response.
var userName = readlineSync.question('May I have your name? ');
console.log('Hi ' + userName + '!');

let hasQuit = false;
const interaction_options = ["Add New Player", "Add New Game Definition", "Record a Game", "Generate Reports"];
const report_options = ["Total Number of Games Played", "Number of Players Who Have Played Games", "Number of Games Played per Player", "Top Score for a Specific Game", "Average Score for a Specific Game", "Average Score for a Specific Player"];

while(!hasQuit){
    // option is the index of interaction_options, -1 is CANCEL
    var option = readlineSync.keyInSelect(interaction_options, "What would you like to do?")
    
    // user wants to exit
    if (option == -1){
        hasQuit = true;
        console.log('Goodbye!');
    }

    // user wants to add a new player
    if (option == 0){
        var username = readlineSync.question("What is the username of the player? ");
        var email = readlineSync.question("What is the email of the player? ");

        var player_confirmation = readlineSync.keyInSelect(["Confirm"], 'Please confirm you want to add the player: Username: ' + username + ', Email: ' + email);

        if(player_confirmation == 0){
            try{
                var new_player = playerModel.create(username, email);
            } catch(error){
                console.log("An error occurred when creating a player. Please ensure that no other player has the same username or email as the one you have submitted.")
            }
            console.log('New player added:');
            console.log(new_player);
        }

    }

    // user wants to add a new game def
    if (option == 1){
        var game_name = readlineSync.question("What is the name of the game? ");
        var game_description = readlineSync.question("What is the game description? ");

         var game_confirmation = readlineSync.keyInSelect(["Confirm"],'Please confirm you want to add the game: Name: ' + game_name + ', Description: ' + game_description);

         if (game_confirmation == 0){
            try{
                var new_game = gameDefinitionModel.create(game_id, game_description);
            } catch(error){
                console.log("An error occurred when creating a game. Please ensure that no other player has the same name as the one you have submitted.")
            }
            console.log('New Game Definition added: ');
            console.log(new_game);
         }
    }

    //user wants to record a game
    if (option == 2){
        var player_username = readlineSync.question("What is the name of the player? ");
        var player_id = playerModel.get_player_id(player_username);

        if(player_id == null){
            console.log('No player found with username: ' + player_username);
        }

        else{
            var game_name = readlineSync.question("What is the name of the game? ");
            var game_id = gameDefinitionModel.get_game_id(game_name);

            if(game_id == null){
                console.log('No game found with name: ' + game_name);
            }

            var player_score = readlineSync.question("What score did they get? ");
            var play_confirmation = readlineSync.keyInSelect(["Confirm"], `Please confirm you want to enter the game play: Username: ${player_username}, Game: ${game_name}, Score: ${player_score} `);

            if(play_confirmation == 0){
            //create a new GamePlay
            var new_game_play = gamePlayModel.create(player_id, game_id, player_score);
            
            console.log('New game play added:');
            console.log(new_game_play);
            }
        }
    }


    // user wants to create a report
    if(option == 3){
        var report_option = readlineSync.keyInSelect(report_options, "What metric would you like to see? ");

        if(report_option == 0) {
            var total_games = reportModel.get_num_games();
            console.log('Total Number of Games Played: ' + total_games);
        }

        if(report_option == 1) {
            var num_players = reportModel.get_num_players_played();
            console.log('Number of Players Who Have Played Games: ' + num_players);
        }

        if (report_option == 2){
            var games_per_player = reportModel.get_games_per_player();
            console.log('Number of Games Played per Player:');

            for(var i = 0; i < games_per_player.length; i++){
                console.log(games_per_player[i].username + ': ' + games_per_player[i].games_played);
            }
        }

        if (report_option == 3){
            var game_name = readlineSync.question("What is the name of the game? ");
            var game_id = gameDefinitionModel.get_game_id(game_name);

            if(game_id == null){
                console.log('No game found with name: ' + game_name);
            }

            var info = reportModel.get_top_score(game_id);
            console.log('Top Score for ' + game_name + ': ' + info.max_score + " by Player: " + info.username);
        }

        if (report_option == 4){
            var game_name = readlineSync.question("What is the name of the game? ");
            var game_id = gameDefinitionModel.get_game_id(game_name);

            if(game_id == null){
                console.log('No game found with name: ' + game_name);
            }

            var avg_score = reportModel.get_avg_score_game(game_id);
            console.log('Average Score for ' + game_name + ': ' + avg_score);
        }

        if(report_option == 5){
            var player_username = readlineSync.question("What is the player's username? ");
            var player_id = playerModel.get_player_id(player_username);

            if(game_id == null){
                console.log('No player found with name: ' + player_username);
            }

            var avg_score_player = reportModel.get_avg_score_player(player_id);
            console.log('Average Score for ' + player_username + ': ' + avg_score_player);
        }
    }
}