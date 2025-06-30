export const errorHandler = (err, req, res, next) => {
  const statusCode = err.name === "ValidationError" ? 400 : 500;
  res.status(statusCode).json({
    error: err.message || "Something went wrong",
  });
};
