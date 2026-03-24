const { connectToDatabase} = require('../database');

class GameDefinitionModel {
    constructor() {
        this.db = connectToDatabase();
    }

    create(name,description){
    // create a new game definition
        const query = 'INSERT INTO GameDefinitions (game_id, name,description) VALUES (NULL, ?, ?)';

    // The `prepare()` method compiles the SQL query, making it ready to execute.
        const stmt = this.db.prepare(query);

    // The `run()` method executes the prepared query, replacing the `?` placeholders with actual values.
        const info = stmt.run(name,description);

    // Returning the new player data, including the generated game_id ID and the creation timestamp.
        return { id: info.lastInsertRowid, name, description};
    }

    delete(game_id){
    // get the game's info before deletion to return to the user
    const deleted_play_info = this.retrieve(game_id);

    const query = 'DELETE FROM GameDefinitions WHERE game_id = ?';

    // compile the query
    const stmt = this.db.prepare(query);

    // execute the query with replacing the placeholder
    const info = stmt.run(game_id);

    // return the deleted game info
    return deleted_play_info
  }

  retrieve(game_id) {
    const query = 'SELECT * FROM GameDefinitions WHERE game_id = ?';

    const stmt = this.db.prepare(query);

    const info = stmt.get(game_id);

    return info;
  }

  update(game_id, new_name = null, new_description = null) {
    const query = 'UPDATE GameDefinitions SET name = ?, description = ? WHERE game_id = ?';

    const game_info = this.retrieve(game_id);

    if(new_name == null){
      new_name = game_info.name;
    }

    if(new_description == null){
      new_description = game_info.description;
    }

    const stmt = this.db.prepare(query);

    const info = stmt.run(new_name, new_description, game_id);

    return this.retrieve(game_id);
  }

  get_game_id(name){
    const query = 'SELECT game_id FROM GameDefinitions WHERE name = ?';

    const stmt = this.db.prepare(query);

    const info = stmt.get(name);

    // tries to access game_id, but if there is no name associated with a tuple,
    // returns null instead
    try{
      return info.game_id;
    } catch(error){
      return null;
    }
  }
}

module.exports = GameDefinitionModel;