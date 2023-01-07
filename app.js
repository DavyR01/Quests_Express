require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.APP_PORT ?? 5008;

app.use(express.json());

const welcome = (req, res) => {
  res.send('Welcome to hell');
};

app.get('/', welcome);

const movieHandlers = require('./movieHandlers');
const usersHandlers = require('./usersHandlers');
const { validateMovie } = require('./validators.js');
const { validateUser } = require('./validators.js');
const { hashPassword } = require('./auth.js');
const test = require('./test_requete.js');
// const { step1 } = require('./test_requete.js');
// const { step2 } = require('./test_requete.js');
// const { lastStep } = require('./test_requete.js');

app.get('/api/movies', movieHandlers.getMovies);
app.get('/api/movies', movieHandlers.getMovies);
app.get('/api/movies', movieHandlers.getMovies);
app.get('/api/movies/:id', movieHandlers.getMovieById);
app.get('/api/users', usersHandlers.getUsers);
app.get('/api/users/:id', usersHandlers.getUsersById);

app.post('/api/movies', validateMovie, movieHandlers.postMovie);
app.post('/api/users', hashPassword, usersHandlers.postUser);

app.put('/api/users/:id', validateUser, usersHandlers.updateUsers);
app.put('/api/movies/:id', validateMovie, movieHandlers.updateMovie);

app.delete('/api/movies/:id', movieHandlers.deleteMovie);
app.delete('/api/users/:id', usersHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error('Something bad happened');
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

/*******************************TEST REQUETE SUR ROUTE (Express 7) ****************************/

app.get('/justToTest', test.step1, test.step2, test.lastStep);
// app.get('/justToTest', step1, step2, lastStep);
