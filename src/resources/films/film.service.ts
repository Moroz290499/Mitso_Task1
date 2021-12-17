import Film from './film.model';
import { IFilm, IBaseFilm, IBaseFilmPartial } from './film.interface';

import Result from '../results/result.model';

const create = async (directorId: string = '', payload: IBaseFilm): Promise<IFilm> => {
  const filmCreatable = { ...payload, directorId };
  return Film.create(filmCreatable);
};

const getAll = async (): Promise<IFilm[]> => Film.getAll();

const getById = async (id: string = ''): Promise<IFilm | null> => Film.getById(id);

const updateById = async (id: string = '', payload: IBaseFilmPartial): Promise<IFilm | null> =>
  Film.updateById(id, payload);

const getAllByDirectorId = async (directorId: string = ''): Promise<IFilm[]> =>
  Film.getAllByDirectorId(directorId);

const deleteById = async (id: string = ''): Promise<IFilm | null> => {
   const filmDeleted = await Film.deleteById(id);
  
  if (filmDeleted) {
    const films = await Result.findAll((result) => result.filmId === filmDeleted.id);
    films.forEach((film) => Result.updateById(film.id, { filmId: null }));
  }
  
  return filmDeleted;
 };

export default { create, getAll,getAllByDirectorId, getById, updateById, deleteById };
