// Importing the 'path' module from Node.js
const path = require('path');
// Importing the 'Router' module from Express.js
const router = require('express').Router();

// Route handler for GET requests to "/notes"
router.get('/notes', (req, res) => {
  // Sending the notes.html file as a response
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// Route handler for all other GET requests
router.get('*', (req, res) => {
  // Sending the index.html file as a response
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Exporting the router module to be used in other parts of the application
module.exports = router;