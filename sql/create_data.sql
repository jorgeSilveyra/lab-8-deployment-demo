INSERT INTO Players VALUES
(NULL, "Alice", "alice123@gmail.com", DATETIME('now')), 
(NULL, "Charlie", "charlie_real@outlook.com", DATETIME('now')), 
(NULL, "Bob", "bobby54@gmail.com", DATETIME('now')),
(NULL, "Ryan", "justinbieber@hotmail.com", DATETIME('now')),
(NULL, "Stephanie", "irs@usa.gov", DATETIME('now')),
(NULL, "George Washington", "iamdead@graveyard.com", DATETIME('now')),
(NULL, "John Doe", "randomrandom@random.com", DATETIME('now'));


INSERT INTO GameDefinitions VALUES 
(NULL, "Tetris", "Player drops and connects blocks to form rows and gain points. The game ends when the blocks hit the top of the screen."),
(NULL, "Pac-Man", "Player controls Pac-Man and goes around a map eating ghosts, cherries, and dots for points. The game ends when Pac-Man hits a ghost when it cannot eat ghosts."),
(NULL, "Snake", "Player controls a snake that eats apples for points and grows every time an apple is eaten. The game ends when the snake collides with itself."),
(NULL, "DavidGame", "Player answers multiplication questions. They gain a point for every correct answer. They have 3 seconds to answer each question. If they give an incorrect answer or run out of time, they lose.");
(NULL, "CJGame", "Player types the text as fast as possible. The final score is calculated based off of how fast they type the text and hit finish. The text must be absolutely correct for the timer to stop.");

INSERT INTO GamePlays VALUES
(NULL, 1, 1, 1200),
(NULL, 3, 3, 450),
(NULL, 1, 2, 980),
(NULL, 4, 1, 1000),
(NULL, 1, 1, 1100),
(NULL, 7, 3, 600),
(NULL, 2, 2, 100),
(NULL, 6, 1, 1500),
(NULL, 5, 3, 50),
(NULL, 5, 2, 2000),
(NULL, 7, 1, 640),
(NULL, 2, 3, 1250),
(NULL, 6, 2, 777),
(NULL, 4, 3, 842),
(NULL, 3, 1, 550);
