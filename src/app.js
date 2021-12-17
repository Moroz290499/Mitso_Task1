const express = require('express');
const directorRouter = require('./resources/directors/director.router');
const filmRouter = require('./resources/films/film.router');
const resultRouter = require('./resources/results/result.router');

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/directors', directorRouter);
app.use('/films', filmRouter);
app.use('/results', resultRouter)

module.exports = app;
