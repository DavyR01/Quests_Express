const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      console.log(hashedPassword);
      req.body.hashedPassword = hashedPassword;

      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const isItDwight = (req, res) => {
  if (
    req.body.email === 'dwight@theoffice.com' &&
    req.body.password === '123456'
  ) {
    res.send('Credentials are valid for Dwight');
  } else {
    res.sendStatus(401);
  }
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        res.send('Credentials are valid');
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

/*******************************TEST REQUETE SUR ROUTE (Express 7) ****************************/

// const step1 = (req, res, next) => {
//   req.message = 'Je suis à l etape 1';
//   next();
// };

// const step2 = (req, res, next) => {
//   req.message += ' et maintenant, je suis à l étape 2';
//   next();
// };

// const lastStep = (req, res) => {
//   res.send(req.message);
// };

// Ici step1, step2 et lastStep sont des middlewares, et seront exécutés l'un après l'autre au déclenchement de la route.*/

module.exports = {
  hashPassword,
  // step1,
  // step2,
  // lastStep,
  isItDwight,
  verifyPassword,
};
