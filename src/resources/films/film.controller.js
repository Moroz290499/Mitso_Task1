const { StatusCodes } = require('http-status-codes');
const Film = require('./film.model');

const catchErrors = require('../../common/catchErrors');
const filmsService = require('./film.service');

exports.create = catchErrors(async (req, res) => {
  const film = await filmsService.create(req.body, req.params);
  if (!film) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ code: 'Film_NOT_CREATE', msg: 'Film not create' });
  }
  return res
    .status(StatusCodes.CREATED)
    .json(Film.toResponse(film));
});

exports.getAll = catchErrors(async (req, res) => {
  const film = await filmsService.getAll();
  if (film.length === 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'Films_NOT_FOUND', msg: 'Films not found' });
  }
  return res.status(StatusCodes.OK).json(film.map(Film.toResponse));
});

exports.getAllByDirectorId = catchErrors(async (req, res) => {
  const films = await filmsService.getAllByDirectorId(req.params.directorId);
  if (films.length === 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'Films_NOT_FOUND', msg: 'Films not found' });
  }
  return res.status(StatusCodes.OK).json(films.map(Film.toResponse));
});

exports.getById = catchErrors(async (req, res) => {
  const film = await filmsService.getById(req.params.filmId);
  if (!film) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'Film_NOT_FOUND', msg: 'Film not found' });
  }
  return res.status(StatusCodes.OK).json(Film.toResponse(film));
});

exports.updateById = catchErrors(async (req, res) => {
  const film = await filmsService.updateById(req.params.filmId, req.body);
  if (!film) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'Film_NOT_FOUND', msg: 'Film not found' });
  }
  return res.status(StatusCodes.OK).json(film && Film.toResponse(film));
});

exports.deleteById = catchErrors(async (req, res) => {
  const film = await filmsService.deleteById(req.params.filmId);
  if (!film) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'Film_NOT_FOUND', msg: 'Film not found' });
  }
  return res.status(StatusCodes.OK).json(Film.toResponse(film));
});