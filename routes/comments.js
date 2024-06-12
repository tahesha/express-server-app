const express = require('express');
const router = express.Router();

// Example in-memory data (usually replaced with database queries)
let comments = [
  { id: 1, postId: 1, content: 'This is a comment on the first post' },
  { id: 2, postId: 1, content: 'Another comment on the first post' },
  { id: 3, postId: 2, content: 'This is a comment on the second post' }
];

// GET all comments or filter by postId
router.get('/', (req, res) => {
  // Check if there's a query parameter 'postId' for filtering
  if (req.query.postId) {
    const filteredComments = comments.filter(c => c.postId === parseInt(req.query.postId)); // Filter comments by postId
    return res.json(filteredComments); // Respond with the filtered comments
  }
  
  // If no filtering is applied, respond with all comments
  res.json(comments); // Respond with JSON array containing all comments
});

// GET comment by ID
router.get('/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id)); // Find comment by ID
  if (!comment) return res.status(404).send('Comment not found'); // If comment not found, send 404 response
  res.json(comment); // Respond with JSON object containing the comment
});

// POST a new comment
router.post('/', (req, res) => {
  const newComment = { // Create a new comment object
    id: comments.length + 1, // Assign a unique ID (usually generated by a database)
    postId: req.body.postId, // Extract postId from request body
    content: req.body.content // Extract content from request body
  };
  comments.push(newComment); // Add the new comment to the comments array
  res.status(201).json(newComment); // Respond with the newly created comment and status code 201 (Created)
});

// PATCH an existing comment
router.patch('/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id)); // Find comment by ID
  if (!comment) return res.status(404).send('Comment not found'); // If comment not found, send 404 response

  // Update comment content if provided in the request body
  if (req.body.content) comment.content = req.body.content; // Update content if provided

  res.json(comment); // Respond with the updated comment
});

// DELETE a comment
router.delete('/:id', (req, res) => {
  const commentIndex = comments.findIndex(c => c.id === parseInt(req.params.id)); // Find index of comment by ID
  if (commentIndex === -1) return res.status(404).send('Comment not found'); // If comment not found, send 404 response

  const deletedComment = comments.splice(commentIndex, 1); // Remove comment from array
  res.json(deletedComment); // Respond with the deleted comment
});

module.exports = router; // Export the router to be used in other parts of the application
