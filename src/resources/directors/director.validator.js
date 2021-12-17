const { body, param } = require('express-validator');

const MIN_PASSWORD = 1;

module.exports = {
  create: () => [
    body('name')
      .isLength({ min: MIN_PASSWORD })
      .withMessage(`The password must be at least ${MIN_PASSWORD} characters`),
      ],
  getById: () => [
    param('directorId')
      .isUUID(4)
      .withMessage(`Param :userId must be valid uuid format`),
  ],
  updateById: () => [
    param('directorId')
      .isUUID(4)
      .withMessage(`Param :userId must be valid uuid format`),
  ],
  deleteById: () => [
    param('directorId')
      .isUUID(4)
      .withMessage(`Param :userId must be valid uuid format`),
  ],
};
