// Require the express module
const express = require('express');
// Require the apiRoutes module from the routes directory
const apiRoutes = require('./routes/apiRoutes');
// Require the htmlRoutes module from the routes directory
const htmlRoutes = require('./routes/htmlRoutes');

// Initialize the app using express
const app = express();
// Set the port for the server to either the environment's PORT variable or 3001
const PORT = process.env.PORT || 3001;

// Set up middleware for parsing JSON bodies
app.use(express.json());
// Set up middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Set up middleware to serve static files from the 'public' directory
app.use(express.static('public'));
// Set up middleware to use apiRoutes for any routes starting with '/api'
app.use('/api', apiRoutes);
// Set up middleware to use htmlRoutes for the default route '/'
app.use('/', htmlRoutes);

// Start the server and listen on the specified PORT
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));