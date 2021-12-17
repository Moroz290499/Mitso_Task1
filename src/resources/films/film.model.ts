import { v4 as uuid } from 'uuid';

import filmsRepo from './film.memory.repository';

import{ IFilm, IBaseFilm, IBaseFilmPartial, IBaseFilmResponse } from './film.interface';

class Film implements IFilm {

  id: string;

  title: string;

  price: number;

  genre: string;

  year: number;

  directorId: string | null;

  constructor({
    title = 'title',
    price = 0,
    genre = 'genre',
    year = 2000,
    directorId=null,
  }: IBaseFilmPartial = {}) {
    this.id = uuid();
    this.title = title;
    this.price = price;
    this.genre = genre;
    this.year = year;
    this.directorId = directorId;
  }

  static async create(newfilm: IBaseFilm): Promise<IFilm> {
    const film = new Film(newfilm);
    const filmInserted = await filmsRepo.add(film);
    return filmInserted;
  }

  static async getAll(): Promise<IFilm[]> {
    const films = await filmsRepo.getAll();
    return films;
  }

  static async getById(id: string): Promise<IFilm | null> {
    const films = await filmsRepo.getAll();
    const idx = films.findIndex((film) => film.id === id);
    if (idx === -1) return null;
    return films[idx]!;
  }

  static async getAllByDirectorId(directorId: string): Promise<IFilm[]> {
    const films = await filmsRepo.getAll();
    return films.filter((film) => film.directorId === directorId);
  }

  static async updateById(id: string, newfilm: IBaseFilmPartial): Promise<IFilm | null> {
    const film = await Film.getById(id);
    if (!film) return null;
    return film.update(newfilm);
  }

  async update(newfilm: IBaseFilmPartial): Promise<IFilm> {
    const { title, price, genre, year, directorId } = newfilm;
    if (title !== undefined) this.title = title;
    if (price !== undefined) this.price = price;
    if (genre !== undefined) this.genre = genre;
    if (year !== undefined) this.year = year;
    if (directorId !== undefined) this.directorId = directorId;

    return this;
  }

  static async findAll(callback: {
    (value: IFilm, index?: number, array?: IFilm[]): boolean;
  }): Promise<IFilm[]> {
    if (typeof callback !== 'function') return [];
    const films = await filmsRepo.getAll();
    return films.filter(callback);
  }
  
  static async deleteById(id: string): Promise<IFilm | null> {
    const film = await Film.getById(id);
    if (!film) return null;
    return filmsRepo.deleteById(film);
  }

  static toResponse(film: IFilm): IBaseFilmResponse {
    const { id, title, price, genre, year, directorId } = film;
    return { id, title, price, genre, year, directorId };
  }
}

export default Film;