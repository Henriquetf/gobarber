enum StatusCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  TOO_MANY_REQUESTS = 429,
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

export class TooManyRequestsError extends AppError {
  constructor(message: string) {
    super(message, StatusCode.TOO_MANY_REQUESTS);
  }
}
