import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import CatchErrors from '../../classes/appError.class';
import Result from './result.model';

import resultService from './result.service';

const create = asyncHandler(async (req: Request, res: Response) => {
  const { filmId } = req.params;
  const result = await resultService.create(filmId, req.body);
  if (!result) {
    throw new CatchErrors('Result not create', StatusCodes.BAD_REQUEST, 'RESULT_NOT_CREATE');
  }
  return res.status(StatusCodes.CREATED).json(Result.toResponse(result));
});

const getAll = asyncHandler(async (_: Request, res: Response) => {
  const results = await resultService.getAll();
  return res.status(StatusCodes.OK).json(results.map(Result.toResponse));
});

const getById = asyncHandler(async (req: Request, res: Response) => {
  const { resultId } = req.params;
  const result = await resultService.getById(resultId);
  if (!result) {
    throw new CatchErrors('Result not found', StatusCodes.NOT_FOUND, 'RESULT_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(Result.toResponse(result));
});

const updateById = asyncHandler(async (req: Request, res: Response) => {
  const { resultId } = req.params;
  const result = await resultService.updateById(resultId, req.body);
  if (!result) {
    throw new CatchErrors('Result not found', StatusCodes.NOT_FOUND, 'RESULT_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(result && Result.toResponse(result));
});

const deleteById = asyncHandler(async (req: Request, res: Response) => {
  const { resultId } = req.params;
  const result = await resultService.deleteById(resultId);
  if (!result) {
    throw new CatchErrors('Result not found', StatusCodes.NOT_FOUND, 'RESULT_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(Result.toResponse(result));
});

const getAllByFilmId = asyncHandler(async (req: Request, res: Response) => {
  const { filmId } = req.params;
  const results = await resultService.getAllByFilmId(filmId);
  return res.status(StatusCodes.OK).json(results.map(Result.toResponse));
});

export default { create, getAll,getAllByFilmId, getById, updateById, deleteById };
