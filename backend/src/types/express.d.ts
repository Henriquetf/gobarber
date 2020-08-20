interface UserShape {
  id: string;
}

declare namespace Express {
  export interface Request {
    user: UserShape;
  }
}
