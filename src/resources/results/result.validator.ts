import { param } from 'express-validator';

const filmParamMessage = 'Param :filmId must be valid uuid format';
const filmParam = param('filmId').isUUID(4).withMessage(filmParamMessage);

const resultParamMessage = 'Param :resultId must be valid uuid format';
const resultParam = param('resultId').isUUID(4).withMessage(resultParamMessage);

export default {
  create: () => [filmParam],
  getById: () => [resultParam],
  getAllByDirectorId: () => [filmParam],
  updateById: () => [resultParam, filmParam],
  deleteById: () => [resultParam],
};
