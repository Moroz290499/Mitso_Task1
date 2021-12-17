import { v4 as uuid } from 'uuid';

import resultsRepo from './result.memory.repository';

import { IResult, IBaseResult, IBaseResultPartial, IBaseResultResponse } from './result.interface';

class Result implements IResult {
  
  id: string;

  country: string;

  proceeds: number;

  views: string;

  filmId: string | null;

  constructor({
    country = 'title',
    proceeds = 0,
    views = '0',
    filmId=null,
  }: IBaseResultPartial = {}) {
    this.id = uuid();
    this.country = country;
    this.proceeds = proceeds;
    this.views = views;
    this.filmId = filmId;
  }

  static async create(newresult: IBaseResult): Promise<IResult> {
    const result = new Result(newresult);
    const resultInserted = await resultsRepo.add(result);
    return resultInserted;
  }

  static async getAll(): Promise<IResult[]> {
    const results = await resultsRepo.getAll();
    return results;
  }

  static async getById(id: string): Promise<IResult | null> {
    const results = await resultsRepo.getAll();
    const idx = results.findIndex((result) => result.id === id);
    if (idx === -1) return null;
    return results[idx]!;
  }

  static async getAllByFilmId(filmId: string): Promise<IResult[]> {
    const results = await resultsRepo.getAll();
    return results.filter((result) => result.filmId === filmId);
  }

  static async updateById(id: string, newresult: IBaseResultPartial): Promise<IResult | null> {
    const result = await Result.getById(id);
    if (!result) return null;
    return result.update(newresult);
  }

  async update(newres: IBaseResultPartial): Promise<IResult> {
    const { country, proceeds, views, filmId } = newres;
    if (country !== undefined) this.country = country;
    if (proceeds !== undefined) this.proceeds = proceeds;
    if (views !== undefined) this.views = views;
    if (filmId !== undefined) this.filmId = filmId;
 
    return this;
  }

  static async findAll(callback: {
    (value: IResult, index?: number, array?: IResult[]): boolean;
  }): Promise<IResult[]> {
    if (typeof callback !== 'function') return [];
    const films = await resultsRepo.getAll();
    return films.filter(callback);
  }

  static async deleteById(id: string): Promise<IResult | null> {
    const result = await Result.getById(id);
    if (!result) return null;
    return resultsRepo.deleteById(result);
  }  

  static toResponse(result: IResult): IBaseResultResponse {
    const { id, country, proceeds, views, filmId } = result;
    return { id, country, proceeds, views, filmId };
  }
}

export default Result;