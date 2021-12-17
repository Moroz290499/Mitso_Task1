const { StatusCodes } = require('http-status-codes');
const Result = require('./result.model');

const catchErrors = require('../../common/catchErrors');
const resultsService = require('./result.service');

exports.create = catchErrors(async (req, res) => {
  const result = await resultsService.create(req.body, req.params);
  if (!result) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ code: 'Result_NOT_CREATE', msg: 'Result not create' });
  }
  return res
    .status(StatusCodes.CREATED)
    .json(Result.toResponse(result));
});

exports.getAll = catchErrors(async (req, res) => {
  const result = await resultsService.getAll();
  if (result.length === 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'Result_NOT_FOUND', msg: 'Result not found' });
  }
  return res.status(StatusCodes.OK).json(result.map(Result.toResponse));
});

exports.getAllByFilmId = catchErrors(async (req, res) => {
  const results = await resultsService.getAllByFilmId(req.params.filmId);
  if (results.length === 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'Result_NOT_FOUND', msg: 'Result not found' });
  }
  return res.status(StatusCodes.OK).json(results.map(Result.toResponse));
});

exports.getById = catchErrors(async (req, res) => {
  const result = await resultsService.getById(req.params.resultId);
  if (!result) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'Result_NOT_FOUND', msg: 'Result not found' });
  }
  return res.status(StatusCodes.OK).json(Result.toResponse(result));
});

exports.updateById = catchErrors(async (req, res) => {
  const result = await resultsService.updateById(req.params.resultId, req.body);
  if (!result) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'Result_NOT_FOUND', msg: 'Result not found' });
  }
  return res.status(StatusCodes.OK).json(result && Result.toResponse(result));
});

exports.deleteById = catchErrors(async (req, res) => {
  const result = await resultsService.deleteById(req.params.resultId);
  if (!result) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'Film_NOT_FOUND', msg: 'Film not found' });
  }
  return res.status(StatusCodes.OK).json(Result.toResponse(result));
});