const express = require('express'); // Import the Express framework
const router = express.Router(); // Create a new router object

// In-memory data store for comments (in a real application, this would be a database)
let comments = [
  { id: 1, postId: 1, content: 'Great post!' },
  { id: 2, postId: 2, content: 'Thanks for sharing!' },
];

// GET route to retrieve all comments
router.get('/', (req, res) => res.json(comments));

// POST route to create a new comment
router.post('/', (req, res) => {
  const newComment = { id: Date.now(), ...req.body }; // Create a new comment object with a unique ID
  comments.push(newComment); // Add the new comment to the comments array
  res.status(201).json(newComment); // Send a response with the created comment and status code 201
});

// PUT route to update an existing comment
router.put('/:id', (req, res) => {
  const commentId = parseInt(req.params.id); // Get the comment ID from the route parameter
  const commentIndex = comments.findIndex(comment => comment.id === commentId); // Find the index of the comment with the given ID
  if (commentIndex !== -1) {
    comments[commentIndex] = { id: commentId, ...req.body }; // Update the comment object
    res.json(comments[commentIndex]); // Send the updated comment as the response
  } else {
    res.status(404).send('Comment not found'); // If the comment is not found, send a 404 response
  }
});

// DELETE route to delete a comment
router.delete('/:id', (req, res) => {
  comments = comments.filter(comment => comment.id !== parseInt(req.params.id)); // Remove the comment with the given ID from the array
  res.status(204).send(); // Send a 204 No Content response
});

module.exports = router; // Export the router to be used in the main app
