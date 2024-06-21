module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super();
    this.message = message;
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static UnauthorizedError() {
    return new ApiError(401, "User is not authorized!");
  }

  static Forbidden() {
    return new ApiError(403, "User is not allowed to access this resource!");
  }

  static NotFound() {
    return new ApiError(404, "Resource not found!");
  }

  static InternalServerError() {
    return new ApiError(500, "Internal server error!");
  }
};