const { v4: uuid } = require('uuid');

const directorsRepo = require('./director.memory.repository');

class Director {
  constructor({
    id = uuid(),
    name = 'name',
    surname = 'surname',
    country = 'country',
    birthday = '01/01/2000',
  } = {}) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.country = country;
    this.birthday = birthday;
  }

  static async create(newdir) {
    const director = new Director(newdir);
    const directorInserted = await directorsRepo.insert(director);
    return directorInserted;
  }

  static async getAll(id) {
    const directors = await directorsRepo.getAll(id);
    return directors;
  }

  static async getById(id) {
    const director = await directorsRepo.getById(id);
    return director;
  }

  static async updateById(id, newdir) {
    const director = await directorsRepo.getById(id);
    const directorUpdated = director?.update(newdir);
    return directorUpdated;
  }

  async update(newdir) {
    const { name, surname, country, birthday } = newdir;
    if (name !== undefined) this.name = name;
    if (surname !== undefined) this.surname = surname;
    if (country !== undefined) this.country = country;
    if (birthday !== undefined) this.birthday = birthday;
 

    return this;
  }

  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  static async deleteById(id) {
    const director = await directorsRepo.deleteById(id);
    return director;
  }

  static toResponse(director) {
    const { id, name, surname, country, birthday } = director;
    return { id, name, surname, country, birthday };
  }
}

module.exports = Director;