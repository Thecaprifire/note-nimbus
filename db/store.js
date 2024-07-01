const util = require('util'); // Importing the 'util' module for utility functions
const fs = require('fs'); // Importing the 'fs' module for file system operations
// This package will be used to generate our unique ids. https://www.npmjs.com/package/uuid
const uuidv1 = require('uuid/v1'); // Importing uuid/v1 package for generating UUIDs
const readFileAsync = util.promisify(fs.readFile); // Promisifying fs.readFile for asynchronous file reading
const writeFileAsync = util.promisify(fs.writeFile); // Promisifying fs.writeFile for asynchronous file writing

class Store {
  read() {
    return readFileAsync('db/db.json', 'utf8'); // Reading 'db/db.json' file asynchronously
  }
  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note, null, 2)); // Formatting with null and 2 for clarity
  }
  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;
      // If notes isn't an array or can't be turned into one, send back a new empty array
      try {
        parsedNotes = [].concat(JSON.parse(notes)); // Parsing JSON string 'notes' into an array
      } catch (err) {
        parsedNotes = []; // Handling parse error by returning an empty array
      }
      return parsedNotes; // Returning parsed notes array
    });
  }
  addNote(note) {
    const { title, text } = note;
    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank"); // Throwing error if 'title' or 'text' is blank
    }
    // Add a unique id to the note using uuid package
    const newNote = { title, text, id: uuidv1() }; // Creating a new note object with title, text, and a unique id
    // Get all notes, add the new note, write all the updated notes, return the newNote
    return this.getNotes()
      .then((notes) => [...notes, newNote]) // Appending newNote to existing notes array
      .then((updatedNotes) => this.write(updatedNotes)) // Writing updated notes array to file
      .then(() => newNote); // Returning the newly added note object
  }
  removeNote(id) {
    // Get all notes, remove the note with the given id, write the filtered notes
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id)) // Filtering out note with specified id
      .then((filteredNotes) => this.write(filteredNotes)); // Writing filtered notes array to file
  }
}

module.exports = new Store(); // Exporting an instance of the Store class