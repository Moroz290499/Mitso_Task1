import { param } from 'express-validator';

const directorParamMessage = 'Param :directorId must be valid uuid format';
const directorParam = param('directorId').isUUID(4).withMessage(directorParamMessage);

const filmParamMessage = 'Param :filmId must be valid uuid format';
const filmParam = param('filmId').isUUID(4).withMessage(filmParamMessage);

export default {
  create: () => [directorParam],
  getById: () => [filmParam],
  getAllByDirectorId: () => [directorParam],
  updateById: () => [filmParam, directorParam],
  deleteById: () => [filmParam],
};
