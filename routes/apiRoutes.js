// Import the Router from Express module
const router = require('express').Router();
// Import the store module for interacting with the database
const store = require('../db/store');

// GET "/api/notes" - Retrieves all notes from the database
router.get('/notes', (req, res) => {
  // Call the getNotes function from the store module
  store
    .getNotes()
    .then((notes) => {
      // Send JSON response with retrieved notes
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err)); // Handle errors
});

// POST "/api/notes" - Adds a new note to the database
router.post('/notes', (req, res) => {
  // Call the addNote function from the store module with request body
  store
    .addNote(req.body)
    .then((note) => res.json(note)) // Send JSON response with added note
    .catch((err) => res.status(500).json(err)); // Handle errors
});

// DELETE "/api/notes/:id" - Deletes the note with the specified id from the database
router.delete('/notes/:id', (req, res) => {
  // Call the removeNote function from the store module with request params id
  store
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true })) // Send JSON response on successful deletion
    .catch((err) => res.status(500).json(err)); // Handle errors
});

// Export the router object for use in other modules
module.exports = router;