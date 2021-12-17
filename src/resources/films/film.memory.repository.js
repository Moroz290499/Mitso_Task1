const films = [];

const add = async (film) => {
  films.push(film);
  return film;
};

const insert = async (film) => add(film);

const getAll = async () => films;

const getById = async (id) => films.find((film) => film.id === id);

const getAllByDirectorId = async (directorId) =>
films.filter((film) => film.directorId === directorId);

const deleteById = async (id) => {
  const idx = films.findIndex((film) => film.id === id);
  if (idx === -1) return null;
  const filmDeletable = films[idx];
  films.splice(idx, 1);
  return filmDeletable;
};

module.exports = { add, insert, getAll, getById, getAllByDirectorId, deleteById };