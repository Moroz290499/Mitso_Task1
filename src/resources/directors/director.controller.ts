import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import CatchErrors from '../../classes/appError.class';
import Director from './director.model';

import directorsService from './director.service';

const create = asyncHandler(async (req: Request, res: Response) => {
  const director = await directorsService.create(req.body);
  if (!director) {
    throw new CatchErrors('Director not create', StatusCodes.BAD_REQUEST, 'DIRECTOR_NOT_CREATE');
  }
  return res.status(StatusCodes.CREATED).json(Director.toResponse(director));
});

const getAll = asyncHandler(async (_: Request, res: Response) => {
  const directors = await directorsService.getAll();
  return res.status(StatusCodes.OK).json(directors.map(Director.toResponse));
});

const getById = asyncHandler(async (req: Request, res: Response) => {
  const { directorId } = req.params;
  const director = await directorsService.getById(directorId);
  if (!director) {
    throw new CatchErrors('Director not found', StatusCodes.NOT_FOUND, 'DIRECTOR_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(Director.toResponse(director));
});

const updateById = asyncHandler(async (req: Request, res: Response) => {
  const { directorId } = req.params;
  const director = await directorsService.updateById(directorId, req.body);
  if (!director) {
    throw new CatchErrors('Director not found', StatusCodes.NOT_FOUND, 'DIRECTOR_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(director && Director.toResponse(director));
});

const deleteById = asyncHandler(async (req: Request, res: Response) => {
  const { directorId } = req.params;
  const director = await directorsService.deleteById(directorId);
  if (!director) {
    throw new CatchErrors('Director not found', StatusCodes.NOT_FOUND, 'DIRECTOR_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(Director.toResponse(director));
});

export default { create, getAll, getById, updateById, deleteById };
