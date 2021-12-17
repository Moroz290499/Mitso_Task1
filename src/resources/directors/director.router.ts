import { Router } from 'express';

import DirectorController from './director.controller';
import DirectorValidator from './director.validator';

import { validate } from '../../middlewares';

const router = Router();

router
  .route('/')
  .get(DirectorController.getAll)
  .post(DirectorController.create);

router
  .route('/:directorId')
  .get(DirectorValidator.getById(), validate, DirectorController.getById)
  .put(DirectorValidator.updateById(), validate, DirectorController.updateById)
  .delete(DirectorValidator.deleteById(), validate, DirectorController.deleteById);

export default router;
