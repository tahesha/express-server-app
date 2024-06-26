const express = require('express');
const router = express.Router();

// Example in-memory data (usually replaced with database queries)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

// GET all users
router.get('/', (req, res) => {
  res.json(users); // Respond with JSON array containing all users
});

// GET user by ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id)); // Find user by ID
  if (!user) return res.status(404).send('User not found'); // If user not found, send 404 response
  res.json(user); // Respond with JSON object containing the user
});

// POST a new user
router.post('/', (req, res) => {
  const newUser = { // Create a new user object
    id: users.length + 1, // Assign a unique ID (usually generated by a database)
    name: req.body.name, // Extract name from request body
    email: req.body.email // Extract email from request body
  };
  users.push(newUser); // Add the new user to the users array
  res.status(201).json(newUser); // Respond with the newly created user and status code 201 (Created)
});

// PATCH an existing user
router.patch('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id)); // Find user by ID
  if (!user) return res.status(404).send('User not found'); // If user not found, send 404 response
  
  // Update user properties if provided in the request body
  if (req.body.name) user.name = req.body.name; // Update name if provided
  if (req.body.email) user.email = req.body.email; // Update email if provided

  res.json(user); // Respond with the updated user
});

// DELETE a user
router.delete('/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id)); // Find index of user by ID
  if (userIndex === -1) return res.status(404).send('User not found'); // If user not found, send 404 response

  const deletedUser = users.splice(userIndex, 1); // Remove user from array
  res.json(deletedUser); // Respond with the deleted user
});

module.exports = router; // Export the router to be used in other parts of the application
