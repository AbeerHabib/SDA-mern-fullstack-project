class ApiError {
  constructor(public code: number, public message: string) {
    this.code = code;
    this.message = message;
  }
  static badRequest(message: string) {
    return new ApiError(400, message);
  }
  static internal(message: string) {
    return new ApiError(500, message);
  }
};

export default ApiError;