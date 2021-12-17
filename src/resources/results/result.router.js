const router = require('express').Router();

const resultsController = require('./result.controller');


router
  .route('/')
  .get(resultsController.getAll);

router
  .route('/:resultId')
  .get(resultsController.getById)
  .put(resultsController.updateById)
  .delete(resultsController.deleteById);

router
  .route('/:filmId/result')
  .get(resultsController.getAllByFilmId)
  .post(resultsController.create);

module.exports = router;