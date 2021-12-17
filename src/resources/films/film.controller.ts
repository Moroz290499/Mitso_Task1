import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import CatchErrors from '../../classes/appError.class';
import Film from './film.model';

import FilmService from './film.service';

const create = asyncHandler(async (req: Request, res: Response) => {
  const { directorId } = req.params;
  const film = await FilmService.create(directorId, req.body);
  if (!film) {
    throw new CatchErrors('Film not create', StatusCodes.BAD_REQUEST, 'FILM_NOT_CREATE');
  }
  return res.status(StatusCodes.CREATED).json(Film.toResponse(film));
});

const getAll = asyncHandler(async (_: Request, res: Response) => {
  const films = await FilmService.getAll();
  return res.status(StatusCodes.OK).json(films.map(Film.toResponse));
});

const getById = asyncHandler(async (req: Request, res: Response) => {
  const { filmId } = req.params;
  const film = await FilmService.getById(filmId);
  if (!film) {
    throw new CatchErrors('Film not found', StatusCodes.NOT_FOUND, 'FILM_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(Film.toResponse(film));
});

const updateById = asyncHandler(async (req: Request, res: Response) => {
  const { filmId } = req.params;
  const film = await FilmService.updateById(filmId, req.body);
  if (!film) {
    throw new CatchErrors('Film not found', StatusCodes.NOT_FOUND, 'FILM_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(film && Film.toResponse(film));
});

const deleteById = asyncHandler(async (req: Request, res: Response) => {
  const { filmId } = req.params;
  const film = await FilmService.deleteById(filmId);
  if (!film) {
    throw new CatchErrors('Film not found', StatusCodes.NOT_FOUND, 'FILM_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(Film.toResponse(film));
});

const getAllByDirectorId = asyncHandler(async (req: Request, res: Response) => {
  const { directorId } = req.params;
  const films = await FilmService.getAllByDirectorId(directorId);
  return res.status(StatusCodes.OK).json(films.map(Film.toResponse));
});

export default { create, getAll,getAllByDirectorId, getById, updateById, deleteById };
