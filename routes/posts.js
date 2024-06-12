// routes/posts.js

const express = require('express');
const router = express.Router();

// Example in-memory data
let posts = [
  { id: 1, title: 'First Post', content: 'This is the first post content' },
  { id: 2, title: 'Second Post', content: 'This is the second post content' }
];

// GET all posts
router.get('/', (req, res) => {
  res.json(posts);
});

// GET post by ID
router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send('Post not found');
  res.json(post);
});

// Simulate an error
router.get('/error', (req, res) => {
  throw new Error('Simulated server error');
});

// POST a new post
router.post('/', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// PATCH an existing post
router.patch('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send('Post not found');

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;

  res.json(post);
});

// DELETE a post
router.delete('/:id', (req, res) => {
  const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (postIndex === -1) return res.status(404).send('Post not found');

  const deletedPost = posts.splice(postIndex, 1);
  res.json(deletedPost);
});

module.exports = router;
