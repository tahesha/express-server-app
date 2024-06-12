const express = require('express'); // Import the Express framework
const router = express.Router(); // Create a new router object

// In-memory data store for posts (in a real application, this would be a database)
let posts = [
  { id: 1, title: 'First Post', content: 'This is the first post.' },
  { id: 2, title: 'Second Post', content: 'This is the second post.' },
];

// GET route to retrieve all posts
router.get('/', (req, res) => res.json(posts));

// POST route to create a new post
router.post('/', (req, res) => {
  const newPost = { id: Date.now(), ...req.body }; // Create a new post object with a unique ID
  posts.push(newPost); // Add the new post to the posts array
  res.status(201).json(newPost); // Send a response with the created post and status code 201
});

// PUT route to update an existing post
router.put('/:id', (req, res) => {
  const postId = parseInt(req.params.id); // Get the post ID from the route parameter
  const postIndex = posts.findIndex(post => post.id === postId); // Find the index of the post with the given ID
  if (postIndex !== -1) {
    posts[postIndex] = { id: postId, ...req.body }; // Update the post object
    res.json(posts[postIndex]); // Send the updated post as the response
  } else {
    res.status(404).send('Post not found'); // If the post is not found, send a 404 response
  }
});

// DELETE route to delete a post
router.delete('/:id', (req, res) => {
  posts = posts.filter(post => post.id !== parseInt(req.params.id)); // Remove the post with the given ID from the array
  res.status(204).send(); // Send a 204 No Content response
});

module.exports = router; // Export the router to be used in the main app