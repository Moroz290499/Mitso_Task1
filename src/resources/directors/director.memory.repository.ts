import {IDirector } from './director.interface';

const directors: IDirector[] = [];

const add = async (director: IDirector): Promise<IDirector> => {
  directors.push(director);
  return director;
};

const getAll = async (): Promise<IDirector[]> => directors;

const deleteById = async ({ id }: IDirector): Promise<IDirector | null>=> {
  const idx = directors.findIndex((director) => director.id === id);
  if (idx === -1) return null;
  const directorDeletable = directors[idx]!;
  directors.splice(idx, 1);
  return directorDeletable;
};

export default { add, getAll, deleteById };