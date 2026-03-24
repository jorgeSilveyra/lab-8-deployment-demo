# Lab 8: Bringing It All Together

**Due Date:** Monday, March 30, 2026, at 5 PM

## Overview

In this lab, you will integrate everything you have learned from previous labs into a complete, web-based application. You will build a dynamic web application using Express, EJS, and SQLite that follows the Model-View-Controller (MVC) design pattern.

You will reuse your database from Lab 6 and extend it into a web interface.

---

## 1. Overview of Middleware in Express

In Express, middleware refers to functions that execute during the request-response cycle. Middleware can parse request bodies, log requests, handle errors, or serve static files. Middleware acts as a bridge between incoming requests and route handlers.

---

## 2. Taking Data from the Front-End with POST Requests

In this section, you will revisit handling data using POST requests. Recall, POST requests are used to send data to a server for processing.

Below is an example of an HTML form that sends a POST request to the `/submit` route:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Post Data Example</title>
</head>
<body>
    <h1>Submit Your Information</h1>
    <form action="/submit" method="POST">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required><br><br>
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required><br><br>

        <button type="submit">Submit</button>
    </form>
</body>
</html>
```

We can also send POST requests with data from client-side javascript. Below is an example that submits a similar request:

```js
function sendPostData() {
    // Define example JSON data (similar to what a form would submit)
    const data = {
        name: "Alice",
        email: "alice@example.com"
    };

    // Use the Fetch API to send a POST request to the '/submit' endpoint.
    // The request includes a JSON-formatted body, which is created by converting
    // the data object to a JSON string using JSON.stringify.
    fetch('/submit', {
        method: 'POST',                // Specify the HTTP method as POST
        headers: {
            'Content-Type': 'application/json' // Set the Content-Type header to indicate JSON data
        },
        body: JSON.stringify(data)     // Convert the data object to a JSON string and send it as the request body
    });
}
```

And here is an example of an Express route that handles the POST request and logs the received data:

```js
// server.js
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
// This allows you to keep your HTML, CSS, and client-side JavaScript separate.
app.use(express.static(path.join(__dirname, 'public')));

// Use body-parser middleware to parse URL-encoded and JSON data sent via POST requests.
// The { extended: false } option tells body-parser to use the classic encoding.
// !! It's important that these middlewares are defined BEFORE the routes.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
  Define a POST route for the '/submit' URL.
  This route will be triggered when the form in the HTML (located in the public directory) is submitted.
*/
app.post('/submit', (req, res) => {
    const userData = req.body; // data sent from the frontend
    console.log('Received data:', userData);
    res.send('Data received!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
```
Middleware must be defined BEFORE your routes or req.body will be undefined.

These examples are provided to guide you in handling POST requests and using middleware to parse and process data.
---

## 3. Lab Requirements

You will extend your Lab 7 system into a **web-based application**.

Your system must support:
- A command-line interface (CLI)
- A web interface

Both must use the **same database**.

---

## Suggested Development Order

1. Create `server.js`
2. Connect your database models
3. Create basic routes
4. Add EJS views
5. Implement players
6. Implement games
7. Implement leaderboard
8. Add logging

---

## MVC Expectations

### Models
- Reuse Lab 7 models
- Handle database logic

### Views
- Use EJS
- Display data

### Controllers
- Defined in `server.js`
- Handle routes and logic

---

## Controller Requirements

- Create `server.js`
- Use Express for routes and middleware
- Keep CLI (`cli.js`) working

---

## Player Features

### `/players`
- List all players
- Link to detail page
- Option to create player

### `/player/:id`
- Show:
  - username
  - email
  - created_at
  - games played
  - scores

---

## Game Requirements

Each partner must implement **one game page**.

### Must include:
- Unique route (`/game1`, `/game2`)
- Name, description, difficulty

---

### REQUIRED: Database Interaction

Each game must:

- Insert a record into `GamePlays`
- Include:
  - player_id
  - game_id
  - score

If your game does not store results in the database, it is incomplete.

---

### Required Flow

User selects player → plays game → submits score → score saved → appears in leaderboard

---

### Note

Games can be simple at start:
- A form submitting a score is a start, but needs to increase in complexity as you get familiar with the technology.

Your game must include at least one piece of logic beyond simple form submission.

Examples:
- Random score generation
- Conditional outcomes (win/lose)
- Basic game rules
- Input validation affecting results



---

## Leaderboard

### `/leaderboard`

- Display the top 5 scores per game and clearly indicate the player associated with each score.
- Must use database data

---

## Logging

- Log all requests to `requests.log`
- Use your Logging class or morgan
- Include:
  - route
  - method
  - timestamp

Add to `.gitignore`:
```
requests.log
```

---

## Definition of Complete

Your lab is complete if:

- Server runs without crashing
- All required routes work
- Data persists in database
- CLI and web match
- Each partner has a working game
- Logging is implemented
- ReadMe file is completed following rules from previous assignments
- Answer the following prompts in your ReadMe file:
    - Describe one design decision you made and why.
    - Be prepared to explain one issue you encountered and how you fixed it.

---

## Summary of Previous Labs (you have seen most of this before!)


- Labs 3–4: Interactive webpages
- Lab 5: Logging
- Lab 6: EJS and routing
- Lab 7: SQLite and CLI

## Deployment

Deployment is NOT required.

Run locally using:

```bash
node server.js
```

---

## Submission

Include:

- README.md
- server.js
- EJS views
- SQL scripts
- Logging module

---

## Key Reminder

If your game does not save results to the database, it is incomplete.
