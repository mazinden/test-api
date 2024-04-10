'use strict';

const db = require('../db'); // Подключение к базе данных

exports.usersGET = function() {
  return db.query('SELECT * FROM users').then(res => res.rows)
    .catch(err => Promise.reject({ status: 500, message: 'Ошибка при получении пользователей', error: err }));
}

exports.usersIdDELETE = function(id) {
  return db.query('DELETE FROM users WHERE id = $1', [id])
    .then(res => {
      if (res.rowCount === 0) {
        return Promise.reject({ status: 404, message: 'Пользователь не найден' });
      }
      return null;
    })
    .catch(err => Promise.reject({ status: 500, message: 'Ошибка при удалении пользователя', error: err }));
}

exports.usersIdGET = function(id) {
  return db.query('SELECT * FROM users WHERE id = $1', [id])
    .then(res => {
      if (res.rows.length === 0) {
        return Promise.reject({ status: 404, message: 'Пользователь не найден' });
      }
      return res.rows[0];
    })
    .catch(err => Promise.reject({ status: 500, message: 'Ошибка при получении пользователя', error: err }));
}

exports.usersPOST = function(body) {
  const { name, email } = body;
  return db.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email])
    .then(res => res.rows[0])
    .catch(err => Promise.reject({ status: 500, message: 'Ошибка при создании пользователя', error: err }));
}
