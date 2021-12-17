const { v4: uuid } = require('uuid');

const resultsRepo = require('./result.memory.repository');

class Result {
  constructor({
    id = uuid(),
    country = 'title',
    proceeds = 0,
    views = '0',
    filmId=null,
  } = {}) {
    this.id = id;
    this.country = country;
    this.proceeds = proceeds;
    this.views = views;
    this.filmId = filmId;
  }

  static async create(newres) {
    const result = new Result(newres);
    const resultInserted = await resultsRepo.insert(result);
    return resultInserted;
  }

  static async getAll(id) {
    const result = await resultsRepo.getAll(id);
    return result;
  }

  static async getAllByFilmId(filmId) {
    const results = await resultsRepo.getAllByDirectorId(filmId);
    return results;
  }

  static async getById(id) {
    const results = await resultsRepo.getById(id);
    return results;
  }

  static async updateById(id, newres) {
    const results = await resultsRepo.getById(id);
    const resultsUpdated = results?.update(newres);
    return resultsUpdated;
  }

  async update(newres) {
    const { country, proceeds, views, filmId } = newres;
    if (country !== undefined) this.country = country;
    if (proceeds !== undefined) this.proceeds = proceeds;
    if (views !== undefined) this.views = views;
    if (filmId !== undefined) this.filmId = filmId;
 
    return this;
  }

  static async findAll(callback) {
    if (typeof callback !== 'function') return null;
    const results = await resultsRepo.getAll();
    return results.filter(callback);
  }

  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  static async deleteById(id) {
    const results = await resultsRepo.deleteById(id);
    return results;
  }

  static toResponse(result) {
    const { id, country, proceeds, views, filmId } = result;
    return { id, country, proceeds, views, filmId };
  }
}

module.exports = Result;