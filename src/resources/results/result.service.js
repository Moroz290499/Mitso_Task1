const Result = require('./result.model');


const create = async (newresult, params) => {
  const resultCreatable = {
    ...newresult,
    filmId: params?.filmId,
  };
  return Result.create(resultCreatable);
};

const getAll = () => Result.getAll();

const getById = (id) => Result.getById(id);

const getAllByFilmId = (filmid) => Result.getAllFilmId(filmid);

const updateById = async (id, newresult) => Result.updateById(id, newresult);

const deleteById = async (id) => {
  const resultDeleted = await Result.deleteById(id);
  
  return resultDeleted;
};

module.exports = { create, getAll, getById, getAllByFilmId, updateById, deleteById };