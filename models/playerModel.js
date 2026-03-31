const { connectToDatabase } = require('../database');

class PlayerModel {
  constructor() {
    this.db = connectToDatabase();
  }

  // Create a new player
  create(username, email) {
    const createdAt = new Date().toISOString(); // Set the current date and time in ISO format
    const query = 'INSERT INTO players (player_id, username, email, created_at) VALUES (NULL, ?, ?, ?)';
    
    // The `prepare()` method compiles the SQL query, making it ready to execute.
    const stmt = this.db.prepare(query);

    // The `run()` method executes the prepared query, replacing the `?` placeholders with actual values.
    console.log(username);
    console.log(email);
    const info = stmt.run(username, email, createdAt);

    // Returning the new player data, including the generated player ID and the creation timestamp.
    return { id: info.lastInsertRowid, username, email, created_at: createdAt };
  }

  delete(player_id){
    // get the player's info before deletion to return to the user
    const deleted_player_info = this.retrieve(player_id);

    const query = 'DELETE FROM Players WHERE player_id = ?';

    // compile the query
    const stmt = this.db.prepare(query);

    // execute the query with replacing the placeholder
    const info = stmt.run(player_id);

    // return the deleted player info
    return deleted_player_info
  }

  retrieve(player_id) {
    const query = 'SELECT * FROM Players WHERE player_id = ?';

    const stmt = this.db.prepare(query);

    const info = stmt.get(player_id);

    return info;
  }

  update(player_id, new_username = null, new_email = null) {
    const query = 'UPDATE Players SET username = ?, email = ? WHERE player_id = ?';

    const player_info = this.retrieve(player_id);

    if(new_username == null){
      new_username = player_info.username;
    }

    if(new_email == null){
      new_email = player_info.email;
    }

    const stmt = this.db.prepare(query);

    const info = stmt.run(new_username, new_email, player_id);

    return this.retrieve(player_id);
  }

  get_player_id(username){
    const query = 'SELECT player_id FROM Players WHERE username = ?';

    const stmt = this.db.prepare(query);

    const info = stmt.get(username);

    // tries to access player_id, but if there is no username associated with a tuple,
    // returns null instead
    try{
      return info.player_id;
    } catch(error){
      return null;
    }
    
  }

  getAll() {
    const query = 'Select * From Players';
    const stmt = this.db.prepare(query);
    const info = stmt.all();
    return info;
  }
}

module.exports = PlayerModel;