// Middleware to log details of each incoming request
const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url}`); // Log the HTTP method and URL of the request.
    next(); // Proceed to the next middleware or route handler.
  };
  
  module.exports = loggerMiddleware; // Export the middleware function
  