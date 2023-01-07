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
  const { firstname, lastname, email, city, language, hashedPassword } =
    req.body;
  console.log(req.body);

  database
    .query(
      'UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ?, hashedPassword = ?',
      [firstname, lastname, email, city, language, hashedPassword]
    )
    .then(([result]) => {
      res.location(`api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error saving the user');
    });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

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

module.exports = {
  getUsers,
  getUsersById,
  postUser,
  updateUsers,
  deleteUser,
};
