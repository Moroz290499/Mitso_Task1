import {IFilm } from './film.interface';

const films: IFilm[] = [];

const add = async (film: IFilm): Promise<IFilm> => {
  films.push(film);
  return film;
};

const getAll = async (): Promise<IFilm[]> => films;

const deleteById = async ({ id }: IFilm): Promise<IFilm | null>=> {
  const idx = films.findIndex((film) => film.id === id);
  if (idx === -1) return null;
  const filmDeletable = films[idx]!;
  films.splice(idx, 1);
  return filmDeletable;
};

export default { add, getAll, deleteById };