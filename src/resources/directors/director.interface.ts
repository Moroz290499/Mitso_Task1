export interface IBaseDirector {
 
  name: string;
  surname: string;
  country: string;
  birthday: string;
}

export interface IBaseDirectorPartial extends Partial<IBaseDirector> {}
export interface IBaseDirectorResponse extends IBaseDirector {
  id: string;
}

export interface IDirector extends IBaseDirector {
  id: string;

  update(payload: IBaseDirectorPartial): Promise<IDirector>;
}
