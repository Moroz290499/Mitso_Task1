const results = [];

const add = async (result) => {
  results.push(result);
  return result;
};

const insert = async (result) => add(result);

const getAll = async () => results;

const getById = async (id) => results.find((result) => result.id === id);

const getAllByFilmId = async (filmId) =>
results.filter((result) => result.filmId === filmId);

const deleteById = async (id) => {
  const idx = results.findIndex((result) => result.id === id);
  if (idx === -1) return null;
  const resultDeletable = results[idx];
  results.splice(idx, 1);
  return resultDeletable;
};

module.exports = { add, insert, getAll, getById, getAllByFilmId, deleteById };