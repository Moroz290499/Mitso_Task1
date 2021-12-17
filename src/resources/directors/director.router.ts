import { Router } from 'express';

import DirectorController from './director.controller';
import DirectorValidator from './director.validator';

const router = Router();

router
  .route('/')
  .get(DirectorController.getAll)
  .post(DirectorValidator.create(), DirectorController.create);

router
  .route('/:directorId')
  .get(DirectorValidator.getById(), DirectorController.getById)
  .put(DirectorValidator.updateById(), DirectorController.updateById)
  .delete(DirectorValidator.deleteById(), DirectorController.deleteById);

export default router;
