const database = require('./database');
const { query } = require('./database');

const getUsers = (req, res) => {
  let sql = 'select * from users';
  const sqlValuesUsers = [];

  if (req.query.language != null) {
    sql += ' where language = ?';
    sqlValuesUsers.push(req.query.language);

    if (req.query.city != null) {
      sql += ' where city = ?';
      sqlValuesUsers.push(req.query.city);
    }
  }

  database
    .query(sql, sqlValuesUsers)
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error retrieving data from database');
    });
};

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query(`select * from users where id= ?`, [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.status(404).send('Not Found');
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error retrieving data from database');
    });
};

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language, hashedPassword } =
    req.body;

  database
    .query(
      'INSERT INTO users(firstname, lastname, email, city, language, hashedPassword) VALUES (?, ?, ?, ?, ?, ?)',
      [firstname, lastname, email, city, language, hashedPassword]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error saving the user');
    });
};

const updateUsers = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language, hashedPassword } =
    req.body;
  console.log(req.params.id);

  if (id != req.payload.sub) {
    res.status(403).send('Forbidden');
    // res.send met fin à une fonction tout comme le return
  }

  database
    .query(
      'UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ?, hashedPassword = ? WHERE id = ?',
      [firstname, lastname, email, city, language, hashedPassword, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Not Found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error saving the user dans cet update');
    });
};

// UPDATE users SET lastname = "random" WHERE id = 31;

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  if (id != req.payload.sub) {
    res.status(403).send('Forbidden');
    // res.send met fin à une fonction tout comme le return
  }

  database
    .query('delete from users where id = ?', [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Not Found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error deleting the movie');
    });
};

const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  const { email } = req.body;

  database
    .query('select * from users where email = ?', [email])
    .then(([users]) => {
      if (users[0] != null) {
        req.user = users[0];

        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

module.exports = {
  getUsers,
  getUsersById,
  postUser,
  updateUsers,
  deleteUser,
  getUserByEmailWithPasswordAndPassToNext,
};
