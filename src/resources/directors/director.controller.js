const { StatusCodes } = require('http-status-codes');
const Director = require('./director.model');

const catchErrors = require('../../common/catchErrors');
const directorsService = require('./director.service');

exports.create = catchErrors(async (req, res) => {
  const director = await directorsService.create(req.body);
  if (!director) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ code: 'Director_NOT_CREATE', msg: 'Director not create' });
  }
  return res
    .status(StatusCodes.CREATED)
    .json(Director.toResponse(director));
});

exports.getAll = catchErrors(async (req, res) => {
  const director = await directorsService.getAll();
  if (director.length === 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'directors_NOT_FOUND', msg: 'directors not found' });
  }
  return res.status(StatusCodes.OK).json(director.map(Director.toResponse));
});
exports.getById = catchErrors(async (req, res) => {
  const director = await directorsService.getById(req.params.directorId);
  if (!director) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'Director_NOT_FOUND', msg: 'Director not found' });
  }
  return res.status(StatusCodes.OK).json(Director.toResponse(director));
});

exports.updateById = catchErrors(async (req, res) => {
  const director = await directorsService.updateById(req.params.directorId, req.body);
  if (!director) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'Director_NOT_FOUND', msg: 'Director not found' });
  }
  return res.status(StatusCodes.OK).json(director && Director.toResponse(director));
});

exports.deleteById = catchErrors(async (req, res) => {
  const director = await directorsService.deleteById(req.params.directorId);
  if (!director) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'Director_NOT_FOUND', msg: 'Director not found' });
  }
  return res.status(StatusCodes.OK).json(Director.toResponse(director));
});