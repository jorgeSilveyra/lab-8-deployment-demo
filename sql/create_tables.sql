PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS GameDefinitions(
    game_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS GamePlays(
    game_play_id INTEGER PRIMARY KEY,
    player_id INTEGER NOT NULL,
    game_id INTEGER NOT NULL,
    score INTEGER NOT NULL,

    FOREIGN KEY(player_id) REFERENCES Players(player_id) ON DELETE CASCADE,
    FOREIGN KEY(game_id) REFERENCES GameDefinitions(game_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Players (
  player_id INTEGER PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL
);
