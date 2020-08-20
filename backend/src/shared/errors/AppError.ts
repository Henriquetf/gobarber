enum StatusCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
}

export class AppError {
  public readonly statusCode: number;

  public readonly message: string;

  constructor(message = 'error', statusCode = 400) {
    this.message = message;
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
