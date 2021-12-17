import { Router } from 'express';

import FilmController from './film.controller';
import FilmValidator from './film.validator';

const router = Router();


router
  .route('/:filmId')
  .get(FilmValidator.getById(),  FilmController.getById)
  .put(FilmValidator.updateById(), FilmController.updateById)
  .delete(FilmValidator.deleteById(), FilmController.deleteById);

router
  .route('/')
  .get(FilmController.getAll);

router
  .route('/:directorId/films')
  .post(FilmValidator.create(), FilmController.create)
  .get(FilmValidator.getAllByDirectorId(), FilmController.getAllByDirectorId);
  

export default router;
