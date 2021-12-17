import { param } from 'express-validator';

const directorParamMessage = 'Param :directorId must be valid uuid format';
const directorParam = param('directorId').isUUID(4).withMessage(directorParamMessage);

export default {
  getById: () => [directorParam],
  updateById: () => [directorParam],
  deleteById: () => [directorParam],
};
