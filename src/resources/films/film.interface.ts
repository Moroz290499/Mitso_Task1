export interface IBaseFilm {
  title: string;
  price: number;
  genre: string;
  year: number;
  directorId: string | null;
}

export interface IBaseFilmPartial extends Partial<IBaseFilm> {}
export interface IBaseFilmResponse extends IBaseFilm {
  id: string;
}

export interface IFilm extends IBaseFilm {
  id: string;

  update(payload: IBaseFilmPartial): Promise<IFilm>;
}
