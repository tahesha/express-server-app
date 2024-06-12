// Middleware to handle errors
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace.
    res.status(500).send('Something went wrong!'); // Send a 500 Internal Server Error response.
  };
  
  module.exports = errorHandler; // Export the middleware function
  