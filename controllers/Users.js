'use strict';

const utils = require('../utils/writer.js');
const Users = require('../service/UsersService');

module.exports.usersGET = function usersGET(req, res, next) {
  Users.usersGET()
    .then(response => utils.writeJson(res, response))
    .catch(error => res.status(error.status || 500).json({ message: error.message }));
};

module.exports.usersIdDELETE = function usersIdDELETE(req, res, next, id) {
  Users.usersIdDELETE(id)
    .then(response => {
      if (response === null) {
        // Если сервис возвращает null, значит пользователь успешно удален,
        // но поскольку нет контента для ответа, возвращаем статус 204 No Content.
        return res.status(204).send();
      }
      utils.writeJson(res, response);
    })
    .catch(error => res.status(error.status || 500).json({ message: error.message }));
};

module.exports.usersIdGET = function usersIdGET(req, res, next, id) {
  Users.usersIdGET(id)
    .then(response => {
      utils.writeJson(res, response);
    })
    .catch(error => res.status(error.status || 500).json({ message: error.message }));
};

module.exports.usersPOST = function usersPOST(req, res, next, body) {
  Users.usersPOST(body)
    .then(response => {
      // Здесь изменяем способ ответа, чтобы явно установить статус код 201
      // и вернуть данные созданного пользователя.
      res.status(201).json(response);
    })
    .catch(error => {
      res.status(error.status || 500).json({ message: error.message });
    });
};
