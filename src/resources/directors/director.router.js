const router = require('express').Router();

const directorsController = require('./director.controller');
const directorsValidator = require('./director.validator');


router
  .route('/')
  .get(directorsController.getAll)
  .post([directorsValidator.create(), directorsController.create]);

router
  .route('/:directorId')
  .get([directorsValidator.getById(), directorsController.getById])
  .put([directorsValidator.updateById(), directorsController.updateById])
  .delete([directorsValidator.deleteById(), directorsController.deleteById]);

module.exports = router;