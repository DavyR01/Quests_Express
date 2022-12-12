const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;
  const errors = [];
  // validate req.body then call next() if everything is ok
  if (title == null) {
    errors.push({ title: 'title', message: 'Title is missing' });
  } else if (title.length >= 255) {
    errors.push({
      title: 'title',
      message: 'Should contain less than 255 characters',
    });
  }
  if (director == null) {
    errors.push({ field: 'director', message: 'This field is required' });
  } else if (director.length >= 255) {
    errors.push({
      director: 'director',
      message: 'Should contain less than 255 characters',
    });
  }
  if (year == null) {
    errors.push({ field: 'year', message: 'This field is required' });
  } else if (year.length >= 5) {
    errors.push({
      year: 'year',
      message: 'Should contain less than 5 characters',
    });
  }
  if (color == null) {
    errors.push({ field: 'color', message: 'This field is required' });
  } else if (color.length >= 255) {
    errors.push({
      color: 'color',
      message: 'Should contain less than 255 characters',
    });
  }
  if (duration == null) {
    errors.push({ field: 'duration', message: 'This field is required' });
  }
  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

const validateUser = (req, res, next) => {
  const { firstname, lastname, email } = req.body;
  const errors = [];
  // validate req.body then call next() if everything is ok
  if (firstname == null) {
    errors.push({ firstname: 'firstname', message: 'Title is missing' });
  } else if (firstname.length >= 255) {
    errors.push({
      firstname: 'firstname',
      message: 'Should contain less than 255 characters',
    });
  }
  if (lastname == null) {
    errors.push({ lastname: 'lastname', message: 'This field is required' });
  } else if (lastname.length >= 255) {
    errors.push({
      lastname: 'lastname',
      message: 'Should contain less than 255 characters',
    });
  }
  if (email == null) {
    errors.push({ email: 'email', message: 'This field is required' });
  } else if (email.length >= 255) {
    errors.push({
      email: 'email',
      message: 'Should contain less than 5 characters',
    });
  }
  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = {
  validateMovie,
  validateUser,
};
