import { Router } from 'express';

import ResultController from './result.controller';
import ResultValidator from './result.validator';

const router = Router();


router
  .route('/:resultId')
  .get(ResultValidator.getById(), ResultController.getById)
  .put(ResultValidator.updateById(), ResultController.updateById)
  .delete(ResultValidator.deleteById(), ResultController.deleteById);

router
  .route('/')
  .get(ResultController.getAll);

router
  .route('/:filmId/results')
  .post(ResultValidator.create(), ResultController.create)
  .get(ResultValidator.getAllByDirectorId(), ResultController.getAllByFilmId);
  

export default router;
