require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.APP_PORT ?? 5000;

app.use(express.json());

// ********************* Déclaration variables : ***********************

const welcome = (req, res) => {
  res.send('Welcome to my quest_express');
};
const movieHandlers = require('./movieHandlers');
const usersHandlers = require('./usersHandlers');
const { validateMovie } = require('./validators.js');
const { validateUser } = require('./validators.js');
const { hashPassword, verifyPassword, verifyToken } = require('./auth.js');
const test = require('./test_requete.js');
// const { step1 } = require('./test_requete.js');
// const { step2 } = require('./test_requete.js');
// const { lastStep } = require('./test_requete.js');
const { isItDwight } = require('./auth.js');

// *********************** The public routes *****************************

/***TEST REQUETE SUR ROUTE (Express 7) ***/

app.get('/justToTest', test.step1, test.step2, test.lastStep);
// app.get('/justToTest', step1, step2, lastStep);

app.get('/', welcome);
app.get('/api/movies', movieHandlers.getMovies);
app.get('/api/movies', movieHandlers.getMovies);
app.get('/api/movies', movieHandlers.getMovies);
app.get('/api/movies/:id', movieHandlers.getMovieById);
app.get('/api/users', usersHandlers.getUsers);
app.get('/api/users/:id', usersHandlers.getUsersById);

// Pour s'enregistrer, s'inscrire : génère un mot de passe haché à partir d'un mot de passe que l'on définit
app.post('/api/users', hashPassword, usersHandlers.postUser);
app.post('/api/logintest', isItDwight);
// Pour se connecter et générer un token
app.post(
  '/api/login',
  usersHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

// ******************** The routes to protect : mur d'authentification, chaque route ci-dessous va nécessiter un jeton (à insérer dans Authorization dans POSTMAN) pour fonctionner, être activé *****************************

// app.use(verifyToken); // authentication wall : verifyToken is activated for each route after this line

// Les validations peuvent et doivent être faites pour les requêtes POST et PUT.
app.post('/api/movies', validateMovie, movieHandlers.postMovie);
app.put('/api/movies/:id', validateMovie, movieHandlers.updateMovie);
app.delete('/api/movies/:id', movieHandlers.deleteMovie);

app.put('/api/users/:id', validateUser, usersHandlers.updateUsers);
app.delete('/api/users/:id', usersHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error('Something bad happened');
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
