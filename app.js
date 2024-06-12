// Import dependencies
const express = require('express'); // Import the Express framework to create the server
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const path = require('path'); // Module for working with file and directory paths

// Create an Express application
const app = express(); // Initialize the Express application

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false })); // Middleware to parse URL-encoded request bodies
app.use(bodyParser.json()); // Middleware to parse JSON request bodies
app.set('view engine', 'ejs'); // Set the view engine to EJS (Embedded JavaScript)
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// Define routes

// Home route - renders the index.ejs view
app.get('/', (req, res) => {
  res.render('index', { title: 'Express Server App' }); // Render the 'index.ejs' view with a title variable
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).send('Something went wrong!'); // Send a generic error response with status code 500
});

// Start the server
const PORT = process.env.PORT || 3000; // Set the port number for the server (use environment variable or default to 3000)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log a message indicating that the server is running
});
