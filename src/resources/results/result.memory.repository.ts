import {IResult } from './result.interface';

const results: IResult[] = [];

const add = async (result: IResult): Promise<IResult> => {
  results.push(result);
  return result;
};

const getAll = async (): Promise<IResult[]> => results;

const deleteById = async ({ id }: IResult): Promise<IResult | null>=> {
  const idx = results.findIndex((result) => result.id === id);
  if (idx === -1) return null;
  const resultDeletable = results[idx]!;
  results.splice(idx, 1);
  return resultDeletable;
};

export default { add, getAll, deleteById };