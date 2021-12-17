const { v4: uuid } = require('uuid');

const filmsRepo = require('./film.memory.repository');

class Film {
  constructor({
    id = uuid(),
    title = 'title',
    price = 0,
    genre = 'genre',
    year = 2000,
    directorId=null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.genre = genre;
    this.year = year;
    this.directorId = directorId;
  }

  static async create(newfilm) {
    const film = new Film(newfilm);
    const filmInserted = await filmsRepo.insert(film);
    return filmInserted;
  }

  static async getAll(id) {
    const films = await filmsRepo.getAll(id);
    return films;
  }

  static async getAllByDirectorId(directorId) {
    const films = await filmsRepo.getAllByDirectorId(directorId);
    return films;
  }

  static async getById(id) {
    const films = await filmsRepo.getById(id);
    return films;
  }

  static async updateById(id, newfilm) {
    const films = await filmsRepo.getById(id);
    const filmUpdated = films?.update(newfilm);
    return filmUpdated;
  }

  async update(newfilm) {
    const { title, price, genre, year, directorId } = newfilm;
    if (title !== undefined) this.title = title;
    if (price !== undefined) this.price = price;
    if (genre !== undefined) this.genre = genre;
    if (year !== undefined) this.year = year;
    if (directorId !== undefined) this.directorId = directorId;
 

    return this;
  }

  static async findAll(callback) {
    if (typeof callback !== 'function') return null;
    const films = await filmsRepo.getAll();
    return films.filter(callback);
  }

  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  static async deleteById(id) {
    const film = await filmsRepo.deleteById(id);
    return film;
  }

  static toResponse(film) {
    const { id, title, price, genre, year, directorId } = film;
    return { id, title, price, genre, year, directorId };
  }
}

module.exports = Film;