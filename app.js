// Import dependencies
const express = require('express'); // Import the Express framework to create the server
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const path = require('path'); // Module for working with file and directory paths

// Import custom middleware
const logger = require('./middleware/logger'); // Custom middleware to log request details
const auth = require('./middleware/auth'); // Custom middleware for handling authentication
const errorHandler = require('./middleware/errorHandler'); // Custom error-handling middleware

// Import routes
const usersRouter = require('./routes/users'); // Routes for handling user-related requests
const postsRouter = require('./routes/posts'); // Routes for handling post-related requests
const commentsRouter = require('./routes/comments'); // Routes for handling comment-related requests

// Create an Express application
const app = express(); // Initialize the Express application

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false })); // Middleware to parse URL-encoded request bodies
app.use(bodyParser.json()); // Middleware to parse JSON request bodies
app.set('view engine', 'ejs'); // Set the view engine to EJS (Embedded JavaScript)
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// Use custom logging middleware to log request details
app.use(logger);

// Define the home route - renders the index.ejs view
app.get('/', (req, res) => {
  res.render('index', { title: 'Express Server App' }); // Render the 'index.ejs' view with a title variable
});

// Use the imported routes and apply the authentication middleware to the users route
app.use('/users', auth, usersRouter); // Use auth middleware for users routes
app.use('/posts', postsRouter); // Use posts routes
app.use('/comments', commentsRouter); // Use comments routes

// Error handling middleware
app.use(errorHandler); // Use custom error-handling middleware

// Start the server
const PORT = process.env.PORT || 3000; // Set the port number for the server (use environment variable or default to 3000)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log a message indicating that the server is running
});
