export const globalErrorHandling = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";

  // console.error(`[Error] ${errorMessage}`);
  // console.error(err.stack);

  const response =
    process.env.NODE_ENVIRONMENT === "development"
      ? {
          success: false,
          statusCode: statusCode,
          message: errorMessage,
          stack: err.stack,
        }
      : {
          success: false,
          statusCode: statusCode,
          message: errorMessage,
        };

  res.status(statusCode).json(response);
};
