const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

// Hasher le password

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

// Générer un token / jeton (Header, Payload, Signature)

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = { sub: req.user.id };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: '1h',
        });

        delete req.user.hashedPassword;
        res.send({ token, user: req.user });
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// Pour protéger sa route avec authentification, l'utilisateur aura donc accès à cette route uniquement si il est authentifié => Pour cela, rentrer son token dans authorization de POSTMAN

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get('Authorization');

    if (authorizationHeader == null) {
      throw new Error('Authorization header is missing');
    }

    const [type, token] = authorizationHeader.split(' ');

    if (type !== 'Bearer') {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.payload = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
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
  verifyToken,
};
