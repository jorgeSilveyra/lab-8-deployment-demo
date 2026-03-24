const { connectToDatabase} = require('../database');
class ReportModel {
    constructor() {
        this.db = connectToDatabase();
    }

    get_num_games(){
        const query = 'SELECT COUNT(*) as total_games FROM GamePlays';

        const stmt = this.db.prepare(query);

        const info = stmt.all();

        return info[0].total_games;
    }

    get_num_players_played(){
        const query = "SELECT COUNT(DISTINCT player_id) as distinct_players FROM GamePlays";

        const stmt = this.db.prepare(query);

        const info = stmt.get();

        return info.distinct_players;
    }

    get_games_per_player(){
        //NOTE: average games played per player does not make sense, so I am interpreting it as games played per player

        const query = "SELECT p.username, COUNT(*) as games_played FROM GamePlays gp JOIN Players p ON gp.player_id = p.player_id GROUP BY p.player_id, p.username";

        const stmt = this.db.prepare(query);

        const info = stmt.all();

        return info;
    }

    get_top_score(game_id){
        const query = "SELECT p.username, MAX(score) as max_score FROM GamePlays gp JOIN Players p ON gp.player_id = p.player_id HAVING game_id = ?";

        const stmt = this.db.prepare(query);

        const info = stmt.get(game_id);

        return info;
    }

    get_avg_score_game(game_id){
        const query = "SELECT AVG(score) as avg_score FROM GamePlays WHERE game_id = ?";

        const stmt = this.db.prepare(query);

        const info = stmt.get(game_id);

        return info.avg_score;
    }

    get_avg_score_player(player_id){
        const query = "SELECT AVG(score) as avg_score FROM GamePlays WHERE player_id = ?";

        const stmt = this.db.prepare(query);

        const info = stmt.get(player_id);

        return info.avg_score;
    }
}

module.exports = ReportModel;