import Director from './director.model';
import { IDirector, IBaseDirector, IBaseDirectorPartial } from './director.interface';

import Film from '../films/film.model';

const create = async (payload: IBaseDirector): Promise<IDirector> => 
  Director.create(payload);
  
;

const getAll = async (): Promise<IDirector[]> => Director.getAll();

const getById = async (id: string = ''): Promise<IDirector | null> => Director.getById(id);

const updateById = async (id: string = '', payload: IBaseDirectorPartial): Promise<IDirector | null> =>
  Director.updateById(id, payload);

const deleteById = async (id: string = ''): Promise<IDirector | null> => {
   const directorDeleted = await Director.deleteById(id);
  
  if (directorDeleted) {
    const films = await Film.findAll((film) => film.directorId === directorDeleted.id);
    films.forEach((film) => Film.updateById(film.id, { directorId: null }));
  }
  
  return directorDeleted;
 };

export default { create, getAll, getById, updateById, deleteById };
