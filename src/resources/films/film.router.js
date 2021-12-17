const router = require('express').Router();

const filmsController = require('./film.controller');


router
  .route('/')
  .get(filmsController.getAll);

router
  .route('/:filmId')
  .get(filmsController.getById)
  .put(filmsController.updateById)
  .delete(filmsController.deleteById);

router
  .route('/:directorId/films')
  .get(filmsController.getAllByDirectorId)
  .post(filmsController.create);

module.exports = router;