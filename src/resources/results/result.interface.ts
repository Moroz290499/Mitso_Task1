export interface IBaseResult {
  country: string;
  proceeds: number;
  views: string;
  filmId: string | null;
}

export interface IBaseResultPartial extends Partial<IBaseResult> {}
export interface IBaseResultResponse extends IBaseResult {
  id: string;
}

export interface IResult extends IBaseResult {
  id: string;

  update(payload: IBaseResultPartial): Promise<IResult>;
}
