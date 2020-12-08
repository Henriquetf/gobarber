enum StatusCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
}

export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message = 'error', statusCode = StatusCode.BAD_REQUEST) {
    super(message);

    this.statusCode = statusCode;
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, StatusCode.BAD_REQUEST);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, StatusCode.UNAUTHORIZED);
  }
}
