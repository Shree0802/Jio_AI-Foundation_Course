export function errorHandler(err, req, res, next) {
  console.error('[Server Error]', err.stack || err.message || err);

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  return res.status(statusCode).json({
    success: false,
    error: err.userFriendlyMessage || "We couldn't generate your result right now. Please try again in a moment."
  });
}
