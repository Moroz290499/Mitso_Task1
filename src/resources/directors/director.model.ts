import { v4 as uuid } from 'uuid';

import directorsRepo from './director.memory.repository';

import{ IDirector, IBaseDirector, IBaseDirectorPartial, IBaseDirectorResponse } from './director.interface';

class Director implements IDirector {

  id: string;

  name: string;

  surname: string;

  country: string;

  birthday: string;

  constructor({
    name = 'name',
    surname = 'surname',
    country = 'country',
    birthday = '01/01/2000',
  }: IBaseDirectorPartial = {}) {
    this.id = uuid();
    this.name = name;
    this.surname = surname;
    this.country = country;
    this.birthday = birthday;
  }

  static async create(newdir: IBaseDirector): Promise<IDirector> {
    const director = new Director(newdir);
    const directorInserted = await directorsRepo.add(director);
    return directorInserted;
  }

  static async getAll(): Promise<IDirector[]> {
    const directors = await directorsRepo.getAll();
    return directors;
  }

  static async getById(id: string): Promise<IDirector | null> {
    const directors = await directorsRepo.getAll();
    const idx = directors.findIndex((director) => director.id === id);
    if (idx === -1) return null;
    return directors[idx]!;
  }

  static async updateById(id: string, newdir: IBaseDirectorPartial): Promise<IDirector | null> {
    const director = await Director.getById(id);
    if (!director) return null;
    return director.update(newdir);
  }

  async update(newdir: IBaseDirectorPartial): Promise<IDirector> {
    const { name, surname, country, birthday } = newdir;
    if (name !== undefined) this.name = name;
    if (surname !== undefined) this.surname = surname;
    if (country !== undefined) this.country = country;
    if (birthday !== undefined) this.birthday = birthday;
 
    return this;
  }

  static async deleteById(id: string): Promise<IDirector | null> {
    const director = await Director.getById(id);
    if (!director) return null;
    return directorsRepo.deleteById(director);
  }

  static toResponse(director: IDirector): IBaseDirectorResponse {
    const { id, name, surname, country, birthday } = director;
    return { id, name, surname, country, birthday };
  }
}

export default Director;