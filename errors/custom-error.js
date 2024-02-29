class CustomAPIError extends Error {
  constructor(message) {
    // previously used (message, statusCode)
    super(message);
    // this.statusCode = statusCode;
  }
}

module.exports = CustomAPIError;
