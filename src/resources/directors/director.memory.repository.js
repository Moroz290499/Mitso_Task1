const directors = [];

const add = async (director) => {
  directors.push(director);
  return director;
};

const insert = async (director) => add(director);

const getAll = async () => directors;

const getById = async (id) => {
  const idx = directors.findIndex((director) => director.id === id);
  if (idx === -1) return null;
  return directors[idx];
};

const deleteById = async (id) => {
  const idx = directors.findIndex((director) => director.id === id);
  if (idx === -1) return null;
  const directorDeletable = directors[idx];
  directors.splice(idx, 1);
  return directorDeletable;
};

module.exports = { add, insert, getAll, getById, deleteById };