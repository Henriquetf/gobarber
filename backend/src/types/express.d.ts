/* eslint-disable @typescript-eslint/naming-convention */
interface IUserShape {
  id: string;
}

declare namespace Express {
  export interface Request {
    user: IUserShape;
  }
}
