import { Router } from 'express';

import ResultController from './result.controller';
import ResultValidator from './result.validator';

const router = Router();

import { validate } from '../../middlewares';

router
  .route('/:resultId')
  .get(ResultValidator.getById(), validate, ResultController.getById)
  .put(ResultValidator.updateById(), validate, ResultController.updateById)
  .delete(ResultValidator.deleteById(), validate, ResultController.deleteById);

router
  .route('/')
  .get(ResultController.getAll);

router
  .route('/:filmId/results')
  .post(ResultValidator.create(), validate, ResultController.create)
  .get(ResultValidator.getAllByDirectorId(), validate, ResultController.getAllByFilmId);
  

export default router;
