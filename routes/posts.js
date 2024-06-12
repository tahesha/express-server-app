const express = require('express');
const router = express.Router();

// Example in-memory data
let posts = [
  { id: 1, title: 'First Post', content: 'This is the first post content', author: 'John', date: '2023-01-01' },
  { id: 2, title: 'Second Post', content: 'This is the second post content', author: 'Jane', date: '2023-02-01' }
];

// GET all posts or filter by query parameters (author, date)
router.get('/', (req, res) => {
  // Start with all posts
  let filteredPosts = posts;

  // Filter by author if query parameter is provided
  if (req.query.author) {
    filteredPosts = filteredPosts.filter(post => post.author === req.query.author);
  }

  // Filter by date if query parameter is provided
  if (req.query.date) {
    filteredPosts = filteredPosts.filter(post => post.date === req.query.date);
  }

  // Respond with the filtered (or all) posts
  res.json(filteredPosts);
});

// GET post by ID
router.get('/:id', (req, res) => {
  // Find the post by ID
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send('Post not found');
  
  // Respond with the found post
  res.json(post);
});

// Simulate an error for testing error handling
router.get('/error', (req, res) => {
  // Throw an error to be caught by error-handling middleware
  throw new Error('Simulated server error');
});

// POST a new post
router.post('/', (req, res) => {
  // Create a new post object
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: req.body.date
  };

  // Add the new post to the posts array
  posts.push(newPost);

  // Respond with the created post
  res.status(201).json(newPost);
});

// PATCH an existing post
router.patch('/:id', (req, res) => {
  // Find the post by ID
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send('Post not found');

  // Update the post's title if provided in the request body
  if (req.body.title) post.title = req.body.title;
  
  // Update the post's content if provided in the request body
  if (req.body.content) post.content = req.body.content;
  
  // Update the post's author if provided in the request body
  if (req.body.author) post.author = req.body.author;
  
  // Update the post's date if provided in the request body
  if (req.body.date) post.date = req.body.date;

  // Respond with the updated post
  res.json(post);
});

// DELETE a post
router.delete('/:id', (req, res) => {
  // Find the index of the post by ID
  const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (postIndex === -1) return res.status(404).send('Post not found');

  // Remove the post from the array
  const deletedPost = posts.splice(postIndex, 1);

  // Respond with the deleted post
  res.json(deletedPost);
});

module.exports = router;
