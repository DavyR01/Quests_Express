/*******************************TEST REQUETE SUR ROUTE (Express 7) ****************************/

const step1 = (req, res, next) => {
  req.message = 'Je suis à l etape 1';
  next();
};

const step2 = (req, res, next) => {
  req.message += ' et maintenant, je suis à l étape 2';
  next();
};

const lastStep = (req, res) => {
  res.send(req.message);
};

module.exports = {
  step1,
  step2,
  lastStep,
};
