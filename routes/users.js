const express = require('express'); // Import the Express framework
const router = express.Router(); // Create a new router object

// In-memory data store for users (in a real application, this would be a database)
let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
];

// GET route to retrieve all users
router.get('/', (req, res) => res.json(users));

// POST route to create a new user
router.post('/', (req, res) => {
  const newUser = { id: Date.now(), ...req.body }; // Create a new user object with a unique ID
  users.push(newUser); // Add the new user to the users array
  res.status(201).json(newUser); // Send a response with the created user and status code 201
});

// PUT route to update an existing user
router.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id); // Get the user ID from the route parameter
  const userIndex = users.findIndex(user => user.id === userId); // Find the index of the user with the given ID
  if (userIndex !== -1) {
    users[userIndex] = { id: userId, ...req.body }; // Update the user object
    res.json(users[userIndex]); // Send the updated user as the response
  } else {
    res.status(404).send('User not found'); // If the user is not found, send a 404 response
  }
});

// DELETE route to delete a user
router.delete('/:id', (req, res) => {
  users = users.filter(user => user.id !== parseInt(req.params.id)); // Remove the user with the given ID from the array
  res.status(204).send(); // Send a 204 No Content response
});

module.exports = router; // Export the router to be used in the main app
