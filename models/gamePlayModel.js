const { connectToDatabase} = require('../database');

class GamePlayModel {
    constructor() {
        this.db = connectToDatabase();
    }

    create(player_id, game_id, score){
    // create a new game play
        const query = 'INSERT INTO GamePlays (game_play_id, player_id, game_id, score) VALUES (NULL, ?, ?, ?)';

    // The `prepare()` method compiles the SQL query, making it ready to execute.
        const stmt = this.db.prepare(query);

    // The `run()` method executes the prepared query, replacing the `?` placeholders with actual values.
        const info = stmt.run(player_id, game_id, score);

    // Returning the new game play data
        return { game_play_id: info.lastInsertRowid, player_id, game_id, score};
    }

    delete(game_play_id){
    // get the game play's info before deletion to return to the user
    const deleted_play_info = this.retrieve(game_play_id);

    const query = 'DELETE FROM GamePlays WHERE game_play_id = ?';

    // compile the query
    const stmt = this.db.prepare(query);

    // execute the query with replacing the placeholder
    const info = stmt.run(game_play_id);

    // return the deleted game play info
    return deleted_play_info
  }

  retrieve(game_play_id) {
    const query = 'SELECT * FROM GamePlays WHERE game_play_id = ?';

    const stmt = this.db.prepare(query);

    const info = stmt.get(game_play_id);

    return info;
  }

  update(game_play_id, new_player_id = null, new_game_id = null, new_score = null) {
    const query = 'UPDATE GamePlays SET player_id = ?, game_id = ?, score = ? WHERE game_play_id = ?';

    const game_play_info = this.retrieve(game_play_id);

    if(new_player_id == null){
      new_player_id = game_play_info.player_id;
    }

    if(new_game_id == null){
      new_game_id = game_play_info.game_id;
    }

    if(new_score == null){
      new_score = game_play_info.new_score;
    }

    const stmt = this.db.prepare(query);

    const info = stmt.run(new_player_id, new_game_id, new_score, game_play_id);

    return this.retrieve(game_play_id);
  }
}

module.exports = GamePlayModel;