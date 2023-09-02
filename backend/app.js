const express = require('express');
const { celebrate, Segments, errors } = require('celebrate');
const Joi = require('joi');
const mongoose = require('mongoose');
const NotFoundError = require('./errors/not-found-err');
const { errorLogger, requestLogger } = require('./middlewares/logger');

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
];

const apiPrefix = '/api';

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const app = express();
app.use(apiPrefix, requestLogger);
app.use(apiPrefix, (req, res, next) => {
  const { method } = req;
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    return res.end();
  }

  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  return next();
});
const port = 3000;

const { login, createUser } = require('./controllers/user');
const auth = require('./middlewares/auth');
const usersRouter = require('./routers/users');
const cardsRouter = require('./routers/cards');

app.use(apiPrefix, express.json());

app.post(`${apiPrefix}/signin`, celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.post(
  `${apiPrefix}/signup`,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
      about: Joi.string().min(2).max(30).default('Исследователь'),
      avatar: Joi.string()
        .pattern(
          /https?:\/\/.*\.?/,
        )
        .default(
          'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
        ),
      password: Joi.string().required(),
    }).unknown(true),
  }),
  createUser,
);

app.use(apiPrefix, auth);

app.use(apiPrefix, usersRouter);
app.use(apiPrefix, cardsRouter);

app.use(errorLogger);
app.use(apiPrefix, errors());

app.use(apiPrefix, (req, res, next) => {
  next(new NotFoundError('Тут ничего нет'));
});

app.use(apiPrefix, (err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .send({ message: err.message || 'Что-то случилось...' });
  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
