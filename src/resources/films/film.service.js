const Film = require('./film.model');
const Result = require("../results/result.model");

const create = async (newfilm, params) => {
  const filmCreatable = {
    ...newfilm,
    directorId: params?.directorId,
  };
  return Film.create(filmCreatable);
};


const getAll = () => Film.getAll();

const getById = (id) => Film.getById(id);

const getAllByDirectorId = (directorid) => Film.getAllByDirectorId(directorid);

const updateById = async (id, newfilm) => Film.updateById(id, newfilm);

const deleteById = async (id) => {
  const filmDeleted = await Film.deleteById(id);
  
  if (filmDeleted && filmDeleted.id) {
    const results = await Result.findAll((result) => result.filmId === filmDeleted.id);
    results.forEach((result) => Result.updateById(result.id, { filmId: null }));
  }
  
  return filmDeleted;
};

module.exports = { create, getAll, getById, getAllByDirectorId, updateById, deleteById };