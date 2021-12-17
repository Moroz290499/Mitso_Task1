import Result from './result.model';
import { IResult, IBaseResult, IBaseResultPartial } from './result.interface';

const create = async (filmId: string = '', payload: IBaseResult): Promise<IResult> => {
  const resultCreatable = { ...payload, filmId };
  return Result.create(resultCreatable);
};

const getAll = async (): Promise<IResult[]> => Result.getAll();

const getById = async (id: string = ''): Promise<IResult | null> => Result.getById(id);

const updateById = async (id: string = '', payload: IBaseResultPartial): Promise<IResult | null> =>
  Result.updateById(id, payload);

const deleteById = async (id: string = ''): Promise<IResult | null> => Result.deleteById(id);

const getAllByFilmId = async (filmId: string = ''): Promise<IResult[]> =>
Result.getAllByFilmId(filmId);

export default { create, getAll,getAllByFilmId, getById, updateById, deleteById };
