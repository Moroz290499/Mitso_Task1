const Director = require('./director.model');
const Film = require('../films/film.model');

const create = async (newdir) => Director.create(newdir);

const getAll = () => Director.getAll();

const getById = (id) => Director.getById(id);

const updateById = async (id, newdir) => Director.updateById(id, newdir);

const deleteById = async (id) => {
  const directorDeleted = await Director.deleteById(id);

  if (directorDeleted && directorDeleted.id) {
    const films = await Film.findAll((film) => film.directorId === directorDeleted.id);
    films.forEach((film) => Film.updateById(film.id, { directorId: null }));
  }

  return directorDeleted;
};

module.exports = { create, getAll, getById, updateById, deleteById };